import { DashboardArt } from "./DashboardArt";
import { cn } from "@/lib/utils";

const symbols: Record<string, string> = {
  Info:"idea", CheckCircle2:"document", XCircle:"warning", "🏆":"trophy", "✅":"document", "❌":"warning", "💡":"idea", "📋":"plan", "🚀":"flag", "⭐":"spark", "🌟":"spark", "📄":"document",
  BookOpen:"book", BookText:"book", Library:"book", GraduationCap:"cap", Brain:"idea", Lightbulb:"idea", Zap:"spark", Sparkles:"spark", Flame:"spark", Trophy:"trophy", Target:"flag", Globe:"globe", Languages:"globe", MapPin:"location", Compass:"location", Headphones:"headphones", Mic:"mic", FileText:"document", PenTool:"note", PenLine:"note", Pencil:"note", NotebookPen:"note", NotebookText:"note", Link2:"pattern", Shuffle:"compare", ArrowLeftRight:"compare", BarChart3:"table", Clock:"clock", Timer:"clock", Calendar:"calendar", Printer:"printer", Puzzle:"puzzle", Search:"review", MessageSquare:"chat", MessageCircle:"chat", Volume2:"headphones",
  "🔤":"book", "📝":"note", "✨":"spark", "📊":"table", "🔷":"pattern", "🔄":"review", "📢":"chat", "🔗":"pattern", "🔮":"idea", "🏷️":"note", "🎯":"flag", "🧊":"pattern", "2️⃣":"table", "📖":"book", "🔍":"review", "🧩":"puzzle", "🔢":"table", "👥":"chat", "👤":"chat", "🔀":"compare", "🔁":"review", "🏗️":"pattern", "⚠️":"warning", "💬":"chat", "✏️":"note", "📐":"pattern", "🚫":"warning", "🔌":"pattern", "❓":"idea", "📍":"location", "↔️":"compare", "🎮":"puzzle", "🃏":"book", "🟦":"puzzle", "🎧":"headphones", "⏱️":"clock", "⚡":"spark", "⏰":"clock", "🌍":"globe", "💭":"chat", "🗣️":"mic", "📑":"document", "⚖️":"compare", "🇬🇧":"globe", "🇺🇸":"globe", "🇨🇦":"globe", "🇦🇺":"globe", "🇳🇿":"globe", "🇮🇪":"globe", "🎉":"trophy", "💪":"flag", "📚":"book",
  listening:"headphones", reading:"book", writing:"note", speaking:"mic", grammar:"pattern", vocabulary:"book", all:"table",
};

/** Decorative art shares the established small faceted-violet icon family. */
export function LearningArt({ name = "book", className, size }: { name?: string; className?: string; size?: number }) {
  const slot = className?.match(/(?:^|\s)w-([0-9.]+)(?:\s|$)/)?.[1];
  const dimension = size ?? (slot ? Math.min(36, Number(slot) * 4) : 24);
  const mapped = symbols[name] || (/^Book|Library/.test(name) ? "book" : /Message|Quote|Users|UserMinus/.test(name) ? "chat" : /Alert|HelpCircle/.test(name) ? "warning" : /Clock|Timer/.test(name) ? "clock" : /Table|BarChart|Layout/.test(name) ? "table" : /Git|Network|CaseSensitive|Split/.test(name) ? "pattern" : /Game|Puzzle/.test(name) ? "puzzle" : /Ear/.test(name) ? "headphones" : /History|Rotate|Refresh/.test(name) ? "review" : /Notepad/.test(name) ? "note" : /Scale/.test(name) ? "compare" : name);
  return <span aria-hidden="true" className={cn("camp-learning-art", className)} style={{ display:"inline-grid", width:dimension, height:dimension }}><DashboardArt name={mapped} size={dimension} /></span>;
}
