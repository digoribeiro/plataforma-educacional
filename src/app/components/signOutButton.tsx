// components/sign-out-button.tsx
"use client";

import { useRouter } from "next/navigation";

export function SignOutButton({ sessionToken }: { sessionToken: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao revogar sessão:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
    >
      Revogar
    </button>
  );
}
