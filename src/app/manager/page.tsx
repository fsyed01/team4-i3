"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
// Import useNavigate hook from react-router-dom

export default function Manager() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize useNavigate hook

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Placeholder for actual authentication logic
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // If authentication is successful, redirect to the desired page
        router.push("/dashboard"); // Use navigate instead of history.push
      } else {
        // Handle errors or unsuccessful login attempts here
        alert("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Welcome to Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="username"
          name="uname"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          name="pwd"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
