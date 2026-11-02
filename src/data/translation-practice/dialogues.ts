import { DIALOGS } from "../alltagsdialoge";
export const dialogues = DIALOGS.flatMap(dialogue => dialogue.lines.filter(line => line.ar).map((line, i) => ({ id: `dialogue-${dialogue.id}-${i}`, english: line.de, arabic: line.ar!, topic: dialogue.title, groupId: dialogue.id, speaker: line.speaker })));
export const dialogueGroups = DIALOGS.map(dialogue => ({ id: dialogue.id, label: `${dialogue.icon} ${dialogue.title}` }));
