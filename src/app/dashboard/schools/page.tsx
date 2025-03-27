import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteSchoolButton } from "./components/DeleteSchoolButton";

export default async function SchoolsListPage() {
  const schools = await prisma.school.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Escolas Cadastradas</h1>
        <Link
          href="/dashboard/schools/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Nova Escola
        </Link>
      </div>

      <div className="space-y-4">
        {schools.map((school) => (
          <div
            key={school.id}
            className="p-4 border rounded-lg flex justify-between items-start"
          >
            <div>
              <h2 className="font-semibold text-lg">{school.name}</h2>
              {school.description && (
                <p className="text-gray-600 mt-1">{school.description}</p>
              )}
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span>
                  Criada em: {new Date(school.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <DeleteSchoolButton id={school.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
