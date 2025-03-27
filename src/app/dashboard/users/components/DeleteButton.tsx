// components/DeleteButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteButton({ userId }: { userId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Falha ao excluir usuário");
      }

      toast.success("Usuário excluído com sucesso");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao excluir usuário"
      );
    }
  };

  return (
    <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm" onClick={handleDelete}>
      Excluir
    </button>
  );
}
