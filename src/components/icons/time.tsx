export function TimeIcon({
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
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>{" "}
      <path d="M12 12l3 -2"></path> <path d="M12 7v5"></path>{" "}
    </svg>
  );
}
