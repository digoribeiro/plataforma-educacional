import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { SchoolForm } from "../components/SchoolForm";
import Header from "@/app/components/Header";

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
    <>
      <Header title="Editar Escol" />
      <div className="mt-4">
        <SchoolForm school={school} />
      </div>
    </>
  );
}
