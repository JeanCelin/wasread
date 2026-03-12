import User from "@/app/(api)/models/User";
import { NextResponse } from "next/server";
import { generateToken } from "../../../lib/jwt.js";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password)
      return NextResponse.json({ message: "Email ou senha não enviados" });

    const user = await User.scope(null).findOne({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Email ou Senha inválido" }, { status: 401 });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    const response = NextResponse.json({
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json(
      { messagee: "Logado com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Erro no login" }, { status: 500 });
  }
}
