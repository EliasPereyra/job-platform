export function InstagramIcon({
  color,
  arialabel,
  size,
}: {
  color?: string;
  arialabel?: string;
  size?: number;
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
      <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>{" "}
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>{" "}
      <path d="M16.5 7.5l0 .01"></path>{" "}
    </svg>
  );
}
