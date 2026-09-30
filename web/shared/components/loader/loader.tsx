import { Metronome } from "ldrs/react";
import "ldrs/react/Metronome.css";

// The package writes the color into an inline custom property, so tokens work.
const TONES = {
  accent: "var(--color-accent)",
  "on-action": "var(--color-on-action)",
  // Follows the text color of the parent, e.g. ghost buttons that swap on hover.
  inherit: "currentColor",
} as const;

type LoaderProps = {
  size?: number;
  tone?: keyof typeof TONES;
  label?: string;
};

export function Loader({ size = 40, tone = "accent", label = "Cargando" }: LoaderProps) {
  return (
    <span role="status" aria-label={label} style={{ display: "inline-flex" }}>
      <Metronome size={size} color={TONES[tone]} />
    </span>
  );
}
