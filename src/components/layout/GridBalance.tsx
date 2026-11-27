"use client";
import { useEffect } from "react";
import { watchGridBalance } from "@/lib/gridBalance";
import "./symmetry.css";
import "./page-polish.css";
import "./liquid-glass.css";
import "./practice-design.css";
import "../practice/practice-hub.css";
import "../course/course-v2.css";
import "../learn/hub-v2.css";
import "../shadowing/recorder-v2.css";
import "../challenge/friend-games.css";
import "../placement/route.css";

/** Balances incomplete last rows in grids inside the learner content area. */
export function GridBalance() {
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main.camp-content");
    return main ? watchGridBalance(main) : undefined;
  }, []);
  return null;
}
