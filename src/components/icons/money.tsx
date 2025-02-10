export function MoneyIcon({
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
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>{" "}
      <path d="M3 6m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>{" "}
      <path d="M18 12l.01 0"></path> <path d="M6 12l.01 0"></path>{" "}
    </svg>
  );
}
