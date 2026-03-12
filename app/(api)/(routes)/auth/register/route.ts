import { NextResponse } from "next/server";
import User from "../../../models/User";
import bcrypt from "bcrypt";
// import { syncDatabase } from "../../../lib/sync";

// await syncDatabase(); // cria tabela se não existir
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password)
      return NextResponse.json(
        { message: "Dados não fornecidos ou faltando" },
        { status: 403 },
      );

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    User.create({
      name,
      email,
      password: hashPassword,
    });

    return NextResponse.json({ message: "Usuário criado" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao registrar usuário" },
      {
        status: 500,
      },
    );
  }
}
