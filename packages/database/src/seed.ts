import { prisma } from "./client";

import type { Message, User } from "@prisma/client";

const Default_User: User = {
  id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  username: 'Test',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const Default_Messages: Message[] = [
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    userId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    message: 'This is test message',
    'coding_type': 'Caesar',
    shift: 29
  }
];

( async () => {
  try {
    await prisma.user.create({
      data: Default_User
    });
    await prisma.message.createMany({
      data: Default_Messages
    })
  } catch(error) {
    console.error(error);
    process.exit(1)
  } finally {
    await prisma.$disconnect();
  }
})();