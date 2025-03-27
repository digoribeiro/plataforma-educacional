import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { UserForm } from "../components/UserForm";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      schools: {
        include: {
          school: true,
        },
      },
    },
  });

  const allSchools = await prisma.school.findMany();

  if (!user) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Editar Usuário: {user.name || user.email}
        </h1>
      </div>
      <UserForm user={user} allSchools={allSchools} />
    </div>
  );
}
