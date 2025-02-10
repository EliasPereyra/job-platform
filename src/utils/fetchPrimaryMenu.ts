import gql from "graphql-tag";
import { fetchGraphQL } from "./fetchGraphQL";
import {
  RootQueryToMediaItemConnection,
  RootQueryToMenuItemConnection,
} from "@/gql/graphql";
import { print } from "graphql/language/printer";

export async function getData() {
  const menuQuery = gql`
    query MenuQuery {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          uri
          target
          label
        }
      }
      mediaItems(where: { search: "logo" }) {
        nodes {
          title
          altText
          sourceUrl
          link
          mediaDetails {
            height
            width
          }
        }
      }
    }
  `;

  const { menuItems, mediaItems } = await fetchGraphQL<{
    menuItems: RootQueryToMenuItemConnection;
    mediaItems: RootQueryToMediaItemConnection;
  }>(print(menuQuery));

  if (menuItems === null || mediaItems === null) {
    throw new Error("Failed to fetch data");
  }

  return {
    menuItems,
    mediaItems,
  };
}
