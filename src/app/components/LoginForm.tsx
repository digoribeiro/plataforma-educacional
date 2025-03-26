"use client";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";

function LoginForm() {
  interface LoginFormData {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const data: LoginFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    signIn("credentials", {
      ...data,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <form onSubmit={login} className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          name="email"
          required
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Senha
        </label>
        <input
          name="password"
          required
          type="password"
          id="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;
