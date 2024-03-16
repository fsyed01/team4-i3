// pages/api/update-stats.js
import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Log the request body
  console.log("Received body:", req.body);

  // Proceed with the database update
  try {
    const { name, field, value } = req.body;
    // Perform your query using parameterized statements
    const result = await sql`
      UPDATE elevate
      SET ${sql.raw(field)} = ${sql.value(value)}
      WHERE name = ${sql.value(name)}
    `;
    // Respond with success
    return res.status(200).json({ message: "Update successful", result });
  } catch (error) {
    // Handle errors
    console.error("Update failed:", error);
    return res.status(500).json({ message: "Update failed", error });
  }
}
