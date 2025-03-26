import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchoolSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description } = createSchoolSchema.parse(body);

    const school = await prisma.school.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(school, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar escola" },
      { status: 500 }
    );
  }
}
