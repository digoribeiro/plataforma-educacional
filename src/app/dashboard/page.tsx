import Header from "../components/Header";
import { SignOutButton } from "../components/signOutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

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
    <div className="min-h-screen">
      <Header title="Dashboard">
        <p className="text-center text-gray-500">
          Bem-vindo <strong>{session.user.name}</strong> ao seu dashboard!
        </p>
      </Header>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {sessions.map((s) => (
            <div
              key={s.id}
              className={`p-4 border rounded-lg mb-2 ${
                s.sessionToken === session.sessionToken
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
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
    </div>
  );
}
