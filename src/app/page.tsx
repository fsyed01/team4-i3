"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from the database and initialize state
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const sortedRows = data.result.rows.sort((a, b) => b.points - a.points);
        const storedEdits = JSON.parse(localStorage.getItem("edits")) || {};

        // Apply stored edits if they exist
        const editedRows = sortedRows.map((row) => {
          const editedRow = { ...row };
          Object.entries(storedEdits).forEach(([key, value]) => {
            if (key.startsWith(row.team)) {
              const field = key.split("-")[1];
              editedRow[field] = value;
            }
          });
          return editedRow;
        });

        setRows(editedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Flagrant Fowl Futbol Association</h1>
      <Link
        href="/dashboard"
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "#009879",
          padding: "10px",
          borderRadius: "5px",
          fontWeight: "bold",
          marginRight: "10px",
        }}
      >
        Go to Dashboard
      </Link>
      <Link
        href="/learnmore"
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "#009879",
          padding: "10px",
          borderRadius: "5px",
          fontWeight: "bold",
          marginRight: "10px",
        }}
      >
        Learn More
      </Link>
      <Link
        href="/login"
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "#009879",
          padding: "10px",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
      >
        Manager Login
      </Link>
      <h2>2023 Final Standings</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Logo</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>Pts</th>
            <th>GP</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.team}>
              <td>{row.team}</td>
              <td>
                <Image
                  src={`/logos/${encodeURIComponent(row.team)}.jpeg`}
                  alt={`${row.team} logo`}
                  width={50}
                  height={50}
                />
              </td>
              <td>{row.wins}</td>
              <td>{row.draws}</td>
              <td>{row.lost}</td>
              <td>{row.gd}</td>
              <td>{row.points}</td>
              <td>{row.gamesplayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
