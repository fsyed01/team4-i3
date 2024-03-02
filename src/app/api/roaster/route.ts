import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { team: string; params: any }
) {
  const result = await sql`
   SELECT * FROM risers_rsvp where player_team = ${params.team}
   ORDER BY id ASC;
  `;
  return NextResponse.json(result);
}
