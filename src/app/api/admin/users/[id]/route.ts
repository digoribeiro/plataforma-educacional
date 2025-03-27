import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UserSchoolRole } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Deleto primeiro todas as relações do usuário e na ultima linha deleto o usuário
    await prisma.$transaction([
      prisma.userSchool.deleteMany({
        where: { userId: params.id },
      }),
      prisma.session.deleteMany({
        where: { userId: params.id },
      }),
      prisma.twoFactorAuth.deleteMany({
        where: { userId: params.id },
      }),
      prisma.account.deleteMany({
        where: { userId: params.id },
      }),
      prisma.user.delete({
        where: { id: params.id },
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao excluir usuário e suas relações" },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, schools } = await req.json();

    // Atualiza o usuário
    await prisma.user.update({
      where: { id: params.id },
      data: {
        name,
      },
    });

    // Remove todas as associações existentes
    await prisma.userSchool.deleteMany({
      where: { userId: params.id },
    });

    // Cria as novas associações
    if (schools && schools.length > 0) {
      await prisma.userSchool.createMany({
        data: schools.map((s: { schoolId: string; role: UserSchoolRole }) => ({
          userId: params.id,
          schoolId: s.schoolId,
          role: s.role,
        })),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}
