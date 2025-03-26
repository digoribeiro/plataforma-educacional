"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./DeleteButton";

export function UserTable({
  users,
  totalUsers,
}: {
  users: any[];
  totalUsers: number;
}) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usuários ({totalUsers})</h1>
        <Link href="/dashboard/admin/users/create">
          <Button>Adicionar Usuário</Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4">{user.name || "-"}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 space-x-2">
                  <Link href={`/dashboard/admin/users/${user.id}`}>
                    <Button variant="outline">Editar</Button>
                  </Link>
                  <DeleteButton userId={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
