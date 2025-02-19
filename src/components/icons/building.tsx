export function BuildingIcon({
  size,
  color,
  arialabel,
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
      <path d="M3 21l18 0"></path> <path d="M9 8l1 0"></path>{" "}
      <path d="M9 12l1 0"></path> <path d="M9 16l1 0"></path>{" "}
      <path d="M14 8l1 0"></path> <path d="M14 12l1 0"></path>{" "}
      <path d="M14 16l1 0"></path>{" "}
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"></path>{" "}
    </svg>
  );
}
