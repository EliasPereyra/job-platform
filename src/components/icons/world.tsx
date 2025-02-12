export default function WorldIcon({
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
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>{" "}
      <path d="M3.6 9h16.8"></path> <path d="M3.6 15h16.8"></path>{" "}
      <path d="M11.5 3a17 17 0 0 0 0 18"></path>{" "}
      <path d="M12.5 3a17 17 0 0 1 0 18"></path>{" "}
    </svg>
  );
}
