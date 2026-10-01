import styles from "./hero-illustration.module.css";

export function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles["hero-illustration"]} ${className}`} aria-hidden>
      <svg
        className={styles["hero-illustration__flight"]}
        viewBox="0 0 280 200"
        fill="none"
      >
        <path
          className={styles["hero-illustration__trail"]}
          d="M8 188C40 152 92 162 112 122C126 92 92 72 77 96C62 120 120 136 160 106C192 82 200 54 226 42"
        />
        <g transform="translate(238 36) rotate(-24)">
          <path
            className={styles["hero-illustration__plane"]}
            d="M-22 -14L22 0L-22 14L-14 0Z"
          />
          <path
            className={styles["hero-illustration__fold"]}
            d="M-14 0L22 0L-8 9"
          />
        </g>
      </svg>
    </div>
  );
}
