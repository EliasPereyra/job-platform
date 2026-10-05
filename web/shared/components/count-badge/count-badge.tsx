import styles from "./count-badge.module.css";

export function CountBadge({ count }: { count: number }) {
  return <span className={styles["count-badge"]}>{count}</span>;
}
