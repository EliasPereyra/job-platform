export function LeftArrowRounded({
  currentColor,
  arialabel,
}: {
  currentColor: string;
  arialabel?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={currentColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={40}
      height={40}
      strokeWidth={2}
      aria-label={arialabel}
    >
      {" "}
      <path d="M12 21a9 9 0 1 0 0 -18a9 9 0 0 0 0 18"></path>{" "}
      <path d="M8 12l4 4"></path> <path d="M8 12h8"></path>{" "}
      <path d="M12 8l-4 4"></path>{" "}
    </svg>
  );
}
