"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

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

  const handleBlur = (rowIndex, field, newValue) => {
    // Update the rows state with the new value
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [field]: newValue };
    setRows(updatedRows);

    // Save the edit to local storage
    const editKey = `${rows[rowIndex].team}-${field}`;
    const newEdits = JSON.parse(localStorage.getItem("edits")) || {};
    newEdits[editKey] = newValue;
    localStorage.setItem("edits", JSON.stringify(newEdits));
  };

  return (
    <div>
      <h1>Flagrant Fowl Futbol Association</h1>
      <h2>2023 Final Standings</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th></th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>Pts</th>
            <th>GP</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.team}>
              <td>{row.team}</td>
              <td>
                <Image
                  src={`/logos/${row.team}.jpeg`}
                  alt={`${row.team} logo`}
                  width={50}
                  height={50}
                />
              </td>
              {["wins", "draws", "lost", "gd", "points", "gamesplayed"].map(
                (field) => (
                  <td
                    key={field}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(index, field, e.target.innerText)}
                  >
                    {row[field]}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
