import { NextResponse } from "next/server";

import prisma from '../../libs/prisma';


export async function POST(request) {
  try {
    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { MSG: "Invalid or empty JSON body" },
        { status: 400 }
      );
    }

    if (!body || !body.name || !body.age) {
      return NextResponse.json(
        { MSG: "Name and age are required" },
        { status: 400 }
      );
    }

    const newStudent = await prisma.student.create({
      data: {
        name: body.name,
        age: body.age,
      },
    });

    return NextResponse.json(
      { MSG: "Success", data: newStudent },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error creating student:", err);
    return NextResponse.json(
      { MSG: "Error creating student", error: err.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(){
    try{
        const students=await prisma.student.findMany()
        return NextResponse.json(students,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({"MSG":"Error","err":err.message})
    }
}
export async function PATCH(request){       
    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { MSG: "Invalid or empty JSON body" },
            { status: 400 }
        );
    }

    if (!body || !body.id) {
        return NextResponse.json(
            { MSG: "ID and at least one field (name or age) are required" },
            { status: 400 }
        );
    }

    try {
        const updatedStudent = await prisma.student.update({
            where: {
                id: body.id
            },
            data: {
                ...(body.name && { name: body?.name }),
                ...(body.age && { age: body?.age })
            }
        });

        return NextResponse.json(
            { MSG: "Success", data: updatedStudent },
            { status: 200 }
        );
    } catch (err) {
        if (err.code === 'P2025') {
            return NextResponse.json(
                { MSG: "Student not found" },
                { status: 404 }
            );
        }
        throw err;
    }
    try{
        const students=await prisma.student.findMany()
        return NextResponse.json(students,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({"MSG":"Error","err":err.message})
    }
}