import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UserSchoolRole } from "@prisma/client";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params.id)
    const userExists = await prisma.user.findUnique({
      where: { userId: params.id },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: { id: params.userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao excluir usuário" },
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
