"use client"; 

import GoogleButton from "./components/GoogleButton";
import LoginForm from "./components/LoginForm";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <LoginForm />
        <div className="space-y-4">
          {/* Formulário de e-mail/senha (existente) */}

          <div className="flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OU</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <GoogleButton onClick={() => signIn("google")} />
        </div>
        <div className="text-center">
          <a
            href="/register"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Criar uma conta
          </a>
        </div>
      </div>
    </div>
  );
}
