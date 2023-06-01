import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from 'interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        hash,
      },
    });
    const tokens = await this.signTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signin(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);

    if (!passwordMatches)
      throw new ForbiddenException('Access Denied. Wrong Password');

    const newTokens = await this.signTokens(user.id, user.email);
    await this.updateRtHash(user.id, newTokens.refresh_token);
    return newTokens;
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refresh(userId: string, refresh_token: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    if (!user.hashedRt) throw new ForbiddenException('Session expired');

    const rtMatch = bcrypt.compare(refresh_token, user.hashedRt);

    if (!rtMatch) throw new ForbiddenException('Access Denied.');

    const tokens = await this.signTokens(user.id, user.email);
    await this.updateRtHash(user.id, user.hashedRt);
    return tokens;
  }

  async updateRtHash(userId: string, refresh_token: string) {
    const hash = await this.hashData(refresh_token);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async signTokens(userId: string, email: string): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          // 3 minutes
          expiresIn: 60 * 3,
          secret: 'at-secret',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          // hour
          expiresIn: 60 * 60,
          secret: 'rt-secret',
        },
      ),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
