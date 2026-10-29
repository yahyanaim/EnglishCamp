export const XP_LEVELS = [
  { level: 1,  title: "Learning level 1",         nextXP: 100   },
  { level: 2,  title: "Learning level 2",         nextXP: 300   },
  { level: 3,  title: "Learning level 3",        nextXP: 600   },
  { level: 4,  title: "Learning level 4",         nextXP: 1000  },
  { level: 5,  title: "Learning level 5",        nextXP: 1500  },
  { level: 6,  title: "Learning level 6",         nextXP: 2200  },
  { level: 7,  title: "Learning level 7",        nextXP: 3000  },
  { level: 8,  title: "Learning level 8",         nextXP: 4000  },
  { level: 9,  title: "Learning level 9",        nextXP: 5500  },
  { level: 10, title: "Learning level 10",   nextXP: Infinity },
];

export function getLevelInfo(totalXP: number) {
  let cumulative = 0;
  for (const lvl of XP_LEVELS) {
    if (totalXP < cumulative + lvl.nextXP) {
      return { level: lvl.level, title: lvl.title, currentXP: totalXP, nextXP: cumulative + lvl.nextXP };
    }
    cumulative += lvl.nextXP;
  }
  return { level: 10, title: "Learning level 10", currentXP: totalXP, nextXP: Infinity };
}
