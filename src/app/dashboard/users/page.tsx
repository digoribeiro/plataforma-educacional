import { prisma } from "@/lib/prisma";
import { UserTable } from "./components/UserTable";
import Header from "@/app/components/Header";

export default async function UsersPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page) || 1;
  const query =
    typeof searchParams?.query === "string" ? searchParams.query : "";

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          email: {
            contains: query,
          },
        },
      ],
    },
    skip: (page - 1) * 10,
    take: 10,
  });

  const totalUsers = await prisma.user.count({
    where: {
      OR: [{ name: { contains: query } }, { email: { contains: query } }],
    },
  });

  return (
    <>
      <Header title={`Total de usuários ${totalUsers}`} />
      <UserTable users={users} />
    </>
  );
}
