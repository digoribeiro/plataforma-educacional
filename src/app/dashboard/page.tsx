import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SignOutButton } from "../components/signOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const sessions = await prisma.session.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-center text-gray-500">
            Bem-vindo <strong>{session.user.name}</strong> ao seu dashboard!
          </p>
          <LogoutButton />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
            {sessions.map((s) => (
              <div
                key={s.id}
                className={`p-4 border rounded-lg mb-2 ${
                  s.sessionToken === session.sessionToken
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={s.user.image || "/default-avatar.png"} // Fallback para imagem padrão
                      alt="Avatar"
                      className="h-10 w-10 rounded-full mr-4"
                    />
                  </div>
                  <div>
                    <p className="font-medium">
                      {s.user.name || "Nome não disponível"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {s.user.email || "Sem e-mail"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {s.createdAt.toLocaleString()}
                    </p>
                  </div>
                  {s.user.email !== session.user.email && (
                    <SignOutButton sessionToken={s.sessionToken} />
                  )}
                </div>
                {s.user.email === session.user.email && (
                  <p className="mt-2 text-sm text-blue-600">Sessão atual</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
