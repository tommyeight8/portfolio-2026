// src/app/(auth)/login/page.tsx
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

function LoginSkeleton() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-slate-950">
      <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}

// // src/app/(auth)/login/page.tsx

// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/lib/auth/auth.config";
// import { LoginForm } from "./LoginForm";

// export default async function LoginPage() {
//   const session = await getServerSession(authOptions);

//   if (session?.user?.role === "admin") {
//     redirect("/admin");
//   }

//   return <LoginForm />;
// }
