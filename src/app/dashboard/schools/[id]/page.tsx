import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { SchoolForm } from "../components/SchoolForm";

export default async function EditSchoolPage({
  params,
}: {
  params: { id: string };
}) {
  const school = await prisma.school.findUnique({
    where: { id: params.id },
  });

  if (!school) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Editar Escola</h1>
      </div>
      <SchoolForm school={school} />
    </div>
  );
}
