export function LeftArrow({
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
      arial-label={arialabel}
    >
      {" "}
      <path d="M5 12l14 0"></path> <path d="M5 12l4 4"></path>{" "}
      <path d="M5 12l4 -4"></path>{" "}
    </svg>
  );
}
