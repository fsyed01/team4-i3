import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Query to select the user's hashed password based on the username
      const query = "SELECT password FROM login WHERE username = $1";
      const { rows } = await sql.query(query, [username]);

      if (rows.length > 0) {
        const hashedPassword = rows[0].password;

        // Use bcrypt to compare submitted password with the hashed password
        if (await bcrypt.compare(password, hashedPassword)) {
          res.status(200).json({ message: "Authentication successful" });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Database or bcrypt error", error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    // Handle non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
