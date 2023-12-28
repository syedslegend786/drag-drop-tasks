"use client";
import React, { useEffect, useState } from "react";

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return {
    isMounted,
  };
}
