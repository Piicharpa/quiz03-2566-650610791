import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";


export const GET = async () => {
  readDB();
  //retry
  const room = DB.rooms;
   
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: 2
  });
  
};

export const POST = async (request) => {
  const body = await request.json();
  const {roomName} = body;
  const payload = checkToken();
  if(!payload)
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );
  
  
  

  readDB();
  
    const foundroom = DB.rooms.find(
      (x) => x.roomName === roomName
    );
    if(foundroom)
  return NextResponse.json(
    {
      ok: false,
      message: `Room ${roomName} already exists`,
    },
    { status: 400 }
  );

  const roomId = nanoid();

  //call writeDB after modifying Database
  // writeDB();
    if(!foundroom && (payload.role === "ADMIN" || payload.role ==="SUPER_ADMIN"))
  return NextResponse.json({
    ok: true,
    roomId: roomId,
    message: `Room ${roomName} has been created`,
  });
};
writeDB();

