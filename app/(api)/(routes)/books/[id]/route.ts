import connectDB from "@/app/(api)/lib/database";
import { NextResponse } from "next/server";
import Book from "@/app/(api)/models/Book";
import { UniqueConstraintError } from "sequelize";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB.authenticate();
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      status,
      author,
      description,
      publication_year,
      pages,
      theme,
    } = body;

    const book = await Book.findByPk(id);
    if (!book)
      return NextResponse.json(
        { message: "Livro não encontrado" },
        { status: 404 },
      );

    await book.update({
      title,
      status,
      author,
      description,
      publication_year,
      pages,
      theme,
    });

    return NextResponse.json(book, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof UniqueConstraintError) {
      return NextResponse.json(
        { message: "Esse título já existe" },
        { status: 409 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Erro inesperado" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB.authenticate();
    const { id } = await params;

    if (!id)
      return NextResponse.json(
        { message: "Id não informado" },
        { status: 400 },
      );

    const deleted = await Book.destroy({
      where: {
        id,
      },
    });

    if (!deleted) {
      return NextResponse.json(
        { message: "Livro não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Livro excluído com sucesso" },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Erro inesperado" }, { status: 500 });
  }
}
