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

export async function POST(
  request: Request,
  { params }: { team: string; params: any }
) {
  const { player_name } = await request.json();
  const result = await sql`
    INSERT INTO risers_rsvp (player_name, player_team,oct_8,oct_15,oct_22,oct_29,nov_5,nov_12,nov_19,nov_26)
    VALUES (${player_name}, ${params.team},'no','yes','no','yes','yes','no','yes','no')
    RETURNING *;
  `;
  return NextResponse.json(result);
}
