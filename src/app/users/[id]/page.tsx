import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { UserForm } from "../components/UserForm";
import Header from "@/app/components/Header";

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
    <>
      <Header title={`Editar Usuário: ${user.name || user.email}`} />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <UserForm user={user} allSchools={allSchools} />
      </div>
    </>
  );
}
