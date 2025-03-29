"use client";

import GoogleButton from "./components/GoogleButton";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <div className="space-y-4">
          <GoogleButton onClick={handleGoogleLogin} />
        </div>
      </div>
    </div>
  );
}
