import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const AUTH_TOKEN = process.env.AUTH_TOKEN as string

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(user) {
        try {
            const check = await bcrypt.compare(password, user.password);
    
            if(check) {
                const { id, email } = user;
                const token = jwt.sign({ id, email }, AUTH_TOKEN, {
                    expiresIn: 3600
                });
    
                return NextResponse.json(token);
            }
            
        } catch (error) {
            return NextResponse.json({message: "Usuário ou senha incorretos"}, { status: HttpStatusCode.Unauthorized });
        }
    }

    return NextResponse.json({message: "Usuário ou senha incorretos"}, { status: HttpStatusCode.Unauthorized });
}