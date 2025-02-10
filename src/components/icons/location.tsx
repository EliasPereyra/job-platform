export function Location({
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
      <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"></path>{" "}
      <path d="M12 2l0 2"></path> <path d="M12 20l0 2"></path>{" "}
      <path d="M20 12l2 0"></path> <path d="M2 12l2 0"></path>{" "}
    </svg>
  );
}
