export function WhatsappIcon({
  color,
  arialabel,
  size,
}: {
  size?: number;
  color?: string;
  arialabel?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size || 24}
      height={size || 24}
      strokeWidth={2}
      aria-label={arialabel}
    >
      {" "}
      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>{" "}
      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>{" "}
    </svg>
  );
}
