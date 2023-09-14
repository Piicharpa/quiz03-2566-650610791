import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Picharpa Eamkanitchart",
    studentId: "650610791",
  });
};
