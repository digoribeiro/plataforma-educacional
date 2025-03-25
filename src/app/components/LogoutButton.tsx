"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      className="cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      onClick={() => signOut()}
    >
      Sair
    </button>
  );
}

export default LogoutButton;
