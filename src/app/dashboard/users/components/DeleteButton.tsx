// components/DeleteButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DeleteButton(user : { user: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const response = await fetch(`/api/admin/users/${user.userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Falha ao excluir usuário");
      }

      toast.success("Usuário excluído com sucesso");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir usuário");
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Excluir
    </Button>
  );
}