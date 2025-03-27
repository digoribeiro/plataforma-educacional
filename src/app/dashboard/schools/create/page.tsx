import Header from "@/app/components/Header";
import { SchoolForm } from "../components/SchoolForm";

export default function CreateSchoolPage() {
  return (
    <>
      <Header title="Cadastrar Nova Escola" />

      <div className="mt-3">
        <SchoolForm />
      </div>
    </>
  );
}
