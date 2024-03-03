"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
export default function Manager() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "manager" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/manager");
    } else {
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Manager Login Page</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="uname"
          required
          value={username}
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          name="pwd"
          required
          value={password}
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
