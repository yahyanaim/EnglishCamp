"use client";
import { useEffect } from "react";
import { watchGridBalance } from "@/lib/gridBalance";
import "./symmetry.css";
import "./page-polish.css";
import "./liquid-glass.css";
import "../practice/practice-hub.css";

/** Balances incomplete last rows in grids inside the learner content area. */
export function GridBalance() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main.camp-content");
    return main ? watchGridBalance(main) : undefined;
  }, []);
  return null;
}
