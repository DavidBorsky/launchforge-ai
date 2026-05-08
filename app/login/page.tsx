import { Navbar } from "@/components/marketing/navbar";
import { AuthForm } from "@/components/dashboard/auth-form";

export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <main className="px-6 py-20">
        <AuthForm mode="login" />
      </main>
    </div>
  );
}
