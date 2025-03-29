import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteSchoolButton } from "./components/DeleteSchoolButton";
import Header from "@/app/components/Header";

export default async function SchoolsListPage() {
  const schools = await prisma.school.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Header title="Escolas Cadastradas" />
      <div className="flex justify-end items-center mb-6">
        <Link
          href="/schools/create"
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
            <div>
              <Link
                href={`/schools/${school.id}`}
                className="px-4 py-1 mr-4 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
              >
                Editar
              </Link>
              <DeleteSchoolButton id={school.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
