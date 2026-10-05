import AccountLayout from "@/modules/auth/pages/account-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AccountLayout>{children}</AccountLayout>;
}
