import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function DashboardPage() {

  const session = await getServerSession(authOptions);

  
  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <LogoutButton />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <p className="text-center mt-40 text-gray-500">
              Bem-vindo {session.user.name} ao seu dashboard!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
