export function RightArrowRounded({
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
      <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18"></path>{" "}
      <path d="M16 12l-4 -4"></path> <path d="M16 12h-8"></path>{" "}
      <path d="M12 16l4 -4"></path>{" "}
    </svg>
  );
}
