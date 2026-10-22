export const XP_LEVELS = [
  { level: 1,  title: "Band 4",         nextXP: 100   },
  { level: 2,  title: "Band 5",         nextXP: 300   },
  { level: 3,  title: "Band 5+",        nextXP: 600   },
  { level: 4,  title: "Band 6",         nextXP: 1000  },
  { level: 5,  title: "Band 6+",        nextXP: 1500  },
  { level: 6,  title: "Band 7",         nextXP: 2200  },
  { level: 7,  title: "Band 7+",        nextXP: 3000  },
  { level: 8,  title: "Band 8",         nextXP: 4000  },
  { level: 9,  title: "Band 8+",        nextXP: 5500  },
  { level: 10, title: "IELTS Master",   nextXP: Infinity },
];

export function getLevelInfo(totalXP: number) {
  let cumulative = 0;
  for (const lvl of XP_LEVELS) {
    if (totalXP < cumulative + lvl.nextXP) {
      return { level: lvl.level, title: lvl.title, currentXP: totalXP, nextXP: cumulative + lvl.nextXP };
    }
    cumulative += lvl.nextXP;
  }
  return { level: 10, title: "IELTS Master", currentXP: totalXP, nextXP: Infinity };
}
