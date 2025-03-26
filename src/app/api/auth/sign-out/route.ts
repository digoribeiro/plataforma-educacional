// app/api/auth/sign-out/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { sessionToken } = await req.json();

  await prisma.session.deleteMany({
    where: {
      userId: session.user.id,
      sessionToken: sessionToken,
      NOT: { sessionToken: session.sessionToken },
    },
  });

  return NextResponse.json({ success: true });
}
