"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      className="cursor-pointer py-2 px-4 border border-transparent rounded-md text-sm font-medium text-black"
      onClick={() => signOut()}
    >
      Sair
    </button>
  );
}

export default LogoutButton;
