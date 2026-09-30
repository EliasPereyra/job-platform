import styles from "./avatar.module.css";

type AvatarProps = {
  name: string;
  image?: string | null;
  size?: "sm" | "lg";
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

export function Avatar({ name, image, size = "sm" }: AvatarProps) {
  return (
    <span className={`${styles.avatar} ${styles[`avatar--${size}`]}`} aria-hidden="true">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles["avatar__image"]} src={image} alt="" />
      ) : (
        initials(name)
      )}
    </span>
  );
}
