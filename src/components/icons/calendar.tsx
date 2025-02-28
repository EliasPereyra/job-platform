export function Calendar({ color }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={24}
      height={24}
      strokeWidth={2}
    >
      {" "}
      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>{" "}
      <path d="M16 3v4"></path> <path d="M8 3v4"></path>{" "}
      <path d="M4 11h16"></path> <path d="M11 15h1"></path>{" "}
      <path d="M12 15v3"></path>{" "}
    </svg>
  );
}
