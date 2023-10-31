import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    // const docs = await prisma.doc.findMany({})
    // const doc1 = docs[0]
    // const doc2 = docs[1]

    // await prisma.doc.update({
    //     where: {
    //         id: doc2.id
    //     }, data: {
    //         relationDocId: doc1.id
    //     }
    // })

    // await prisma.doc.create({
    //     data: {
    //         title: "Documento 3",
    //         Action: {
    //             create: {
    //                 action: "created",
    //                 actionBy: "jpfontesferreira1@gmail.com"
    //             }
    //         }
    //     }
    // })

    // await prisma.doc.create({
    //     data: {
    //         title: "Documento 2",
    //     }
    // })

    return NextResponse.json({})
}