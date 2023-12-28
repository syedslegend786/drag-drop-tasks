"use client";
import { Board } from "@/components/board";
import { useIsMounted } from "@/hooks/useIsMounted";
import React from "react";

const Home = () => {
  const { isMounted } = useIsMounted();
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <Board />
    </div>
  );
};

export default Home;
