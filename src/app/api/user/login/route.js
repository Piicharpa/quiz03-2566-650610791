import jwt from "jsonwebtoken";

import { DB, readDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  readDB();
  const body = await request.json();
  const { username, password } = body;
  //skiping validation


  //input user and password ตรงใน DB?
  const user = DB.users.find(
    (user) => user.username === username && user.password === password
  );
  //กรณีที่ไม่ตรง
  if(!user)
  return NextResponse.json(
    {
      ok: false,
      message: "Username or password is incorrect",
    },
    { status: 400 }
  ); 

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Username or Password is incorrect",
  //   },
  //   { status: 400 }
  // );

  const token = jwt.sign(
    {
      username,
      role: user.role,
      studentId: user.studentId
    },
    process.env.JWT_SECRET,
    {expiresIn: "8h"}
  );
  //"Replace this with token creation";

  return NextResponse.json({ ok: true, token });
};
