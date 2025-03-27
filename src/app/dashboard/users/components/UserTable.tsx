"use client";
import Link from "next/link";
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
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className="px-4 py-1 mr-4 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm">Editar</button>
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
