import { SchoolForm } from "../components/SchoolForm";

export default function CreateSchoolPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Cadastrar Nova Escola</h1>
      </div>
      <SchoolForm />
    </div>
  );
}
