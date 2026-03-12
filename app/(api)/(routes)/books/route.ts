export const runtime = "nodejs";

import Book from "../../models/Book";
import { NextResponse } from "next/server";




export async function GET() {
  try {


    const books = await Book.findAll();
    if (books.length <= 0)
      return Response.json(
        { message: "Não existem livros cadastrados" },
        { status: 404 },
      );

    return Response.json({ books });
  } catch {
    return Response.json({ message: "Erro ao conectar" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {

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

    if (!title || !status || !author || !theme)
      return NextResponse.json(
        {
          message: "Coluna não fornecida ou com dados inválidos.",
        },
        { status: 500 },
      );

    const newBook = await Book.create({
      title,
      status,
      author,
      description,
      publication_year,
      pages,
      theme,
    });

    return NextResponse.json(newBook, {
      status: 201,
    });
  } catch (error: unknown) {
    const err = error as Error & { name?: string };
    if (err.name === "SequelizeUniqueConstraintError")
      return NextResponse.json(
        { message: "Esse título já existe" },
        { status: 409 },
      );

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}



