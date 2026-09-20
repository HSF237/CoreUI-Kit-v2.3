import {
  Layers,
  LayoutDashboard,
  LoaderCircle,
  Megaphone,
  MousePointerClick,
  Sparkles,
  TextCursorInput,
  WalletCards,
} from "lucide-react";

export const categoryIcons = {
  fintech: WalletCards,
  dashboard: LayoutDashboard,
  interactive: Sparkles,
  buttons: MousePointerClick,
  loaders: LoaderCircle,
  forms: TextCursorInput,
  overlays: Layers,
  marketing: Megaphone,
};

export const categoryStyles = {
  fintech: "border-emerald-300/15 bg-emerald-300/[0.07] text-emerald-200",
  dashboard: "border-blue-300/15 bg-blue-300/[0.07] text-blue-200",
  interactive: "border-amber-300/15 bg-amber-300/[0.07] text-amber-200",
  buttons: "border-rose-300/15 bg-rose-300/[0.07] text-rose-200",
  loaders: "border-lime-300/15 bg-lime-300/[0.07] text-lime-200",
  forms: "border-sky-300/15 bg-sky-300/[0.07] text-sky-200",
  overlays: "border-violet-300/15 bg-violet-300/[0.07] text-violet-200",
  marketing: "border-fuchsia-300/15 bg-fuchsia-300/[0.07] text-fuchsia-200",
};

export const categoryDotStyles = {
  fintech: "bg-emerald-400",
  dashboard: "bg-blue-400",
  interactive: "bg-amber-400",
  buttons: "bg-rose-400",
  loaders: "bg-lime-400",
  forms: "bg-sky-400",
  overlays: "bg-violet-400",
  marketing: "bg-fuchsia-400",
};

export const categorySwatchClasses = [
  "bg-emerald-400",
  "bg-blue-400",
  "bg-amber-400",
  "bg-rose-400",
  "bg-lime-400",
  "bg-sky-400",
  "bg-violet-400",
  "bg-fuchsia-400",
];
