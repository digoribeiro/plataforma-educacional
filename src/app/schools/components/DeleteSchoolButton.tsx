// app/components/delete-school-button.tsx
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteSchoolButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja remover esta escola?")) return;

    try {
      const res = await fetch(`/api/admin/schools/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
      toast.success("Escola excluía com sucesso");
    } catch (error) {
      console.error("Falha ao remover escola:", error);
      toast.error("Erro ao excluir escola");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
    >
      Remover
    </button>
  );
}
