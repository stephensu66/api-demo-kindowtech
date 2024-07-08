"use client";

import React from "react";
import { useState } from "react";

interface ApiResponse {
  bioRes: string;
  painPointsRes: string;
  goalsRes: string;
}

export default function Home() {
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState("");
  const [contentObjective, setContentObjective] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [painPoints, setPainPoints] = useState("");
  const [goals, setGoals] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //api request
      const res = await fetch("/api/modelReq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand, contentObjective, targetAudience, industry, painPoints, goals }),
      });


      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setResponse(data);

    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Enter brand"
        />
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Enter industry"
        />
        <input
          type="text"
          value={contentObjective}
          onChange={(e) => setContentObjective(e.target.value)}
          placeholder="Enter contentObjective"
        />
        <input
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="Enter targetAudience (comma separated)"
        />
        <input
          type="text"
          value={painPoints}
          onChange={(e) => setPainPoints(e.target.value)}
          placeholder="Enter pain points (comma separated)"
        />
        <input
          type="text"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="Enter goals (comma separated)"
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <div>Bio: {response.bioRes}</div>
          <div>Pain Points: {response.painPointsRes}</div>
          <div>Goals: {response.goalsRes}</div>
        </div>
      )}
    </div>
  );
}
