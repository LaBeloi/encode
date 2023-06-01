import { EncodeLayout } from "../encodeLayout/EncodeLayout";
import { Logout } from "../logout/Logout";

export function Layout() {
  return (
    <>
      <Logout />
      <EncodeLayout />
    </>
  )
}