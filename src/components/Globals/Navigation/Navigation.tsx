import Image from "next/image";
import Link from "next/link";
import styles from "./Navigation.module.css";
import { getData } from "@/utils/fetchPrimaryMenu";
import { MenuItem } from "@/gql/graphql";

export default async function Navigation() {
  const { menuItems, mediaItems } = await getData();
  const { nodes } = mediaItems;

  return (
    <nav
      className={styles.navigation}
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <Link href="/">
        <Image
          style={{ objectFit: "contain", width: "4em", height: "2em" }}
          src={nodes[2].sourceUrl || ""}
          alt={nodes[2].altText || ""}
          width={nodes[2].mediaDetails?.width || 0}
          height={nodes[2].mediaDetails?.height || 0}
        />
      </Link>
      <ul className={styles.menu}>
        {menuItems.nodes.map((item: MenuItem, index: number) => {
          if (!item.uri) return null;

          return (
            <li key={index}>
              <Link
                className={styles.menuItem}
                itemProp="url"
                href={item.uri}
                key={index}
                target={item.target || "_self"}
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
