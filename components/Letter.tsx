"use client";

import React from "react";

interface LetterProps {
  char: string;
}
const Letter = ({ char }: LetterProps) => {
  // Add your component logic here

  return <div className="text-9xl text-red-500 font-bold">{char}</div>;
};

export default Letter;
