import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateSchoolSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, description } = updateSchoolSchema.parse(body);

    const updatedSchool = await prisma.school.update({
      where: { id: params.id },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(updatedSchool);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar escola" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.school.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao remover escola" },
      { status: 500 }
    );
  }
}
