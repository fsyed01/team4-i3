"use client";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";
import { useEffect, useState } from "react";
interface PlayerProps {
  params: {
    team: string;
  };
}

interface Player {
  player_name: string;
}

const PlayersList = ({ params }: PlayerProps) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newPlayerName, setNewPlayerName] = useState<string>("");

  useEffect(() => {
    fetchPlayers();
  }, [params.team]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/${params.team}/rsvp`);
      const data = await response.json();
      if (data && Array.isArray(data.rows)) {
        const playerNames = data.rows.map(
          (row: { player_name: any }) => row.player_name
        );
        setPlayers(playerNames);
      } else {
        console.error("Expected an array of player rows, received:", data);
        setPlayers([]);
      }
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newPlayerName.trim()) return;

    try {
      const response = await fetch(`/api/${params.team}/addplayer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player_name: newPlayerName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add player: ${response.statusText}`);
      }

      setNewPlayerName("");
      fetchPlayers();
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  // delete players
  const handleDeletePlayer = async (player_name: string) => {
    if (!confirm(`Are you sure you want to delete ${player_name}?`)) return;

    try {
      const response = await fetch(`/api/${params.team}/deleteplayer`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player_name }),
      });

      if (response.ok) {
        if (response.status !== 204) {
          const data = await response.json();
          console.log(data);
        }
        fetchPlayers();
      } else {
        throw new Error(`Failed to delete player: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Team {params.team.toUpperCase()}</h1>
      <form onSubmit={handleAddPlayer}>
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="New Player Name"
        />
        <button type="submit">Add Player</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((playerName, index) => (
            <tr key={index}>
              <td>{playerName}</td>
              <td>
                <button onClick={() => handleDeletePlayer(playerName)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList;
