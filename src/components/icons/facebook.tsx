export function FacebookIcon({
  color,
  arialabel,
}: {
  color?: string;
  arialabel?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokelinecap="round"
      strokelinejoin="round"
      width={24}
      height={24}
      strokeWidth={2}
      aria-label={arialabel}
    >
      {" "}
      <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>{" "}
    </svg>
  );
}
