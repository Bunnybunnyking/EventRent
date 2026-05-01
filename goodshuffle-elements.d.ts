import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "gspro-wishlist-config": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          "data-url"?: string;
          "wishlist-alias"?: string;
          "show-quantity-on-card"?: string;
        }, HTMLElement
      >;
      "gspro-item-gallery": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          category?: string;
          group?: string;
          search?: string;
          tags?: string;
          size?: string;
          "show-search"?: string;
          "show-categories"?: string;
          "show-filters"?: string;
          "scope-category"?: string;
          "scope-group"?: string;
          "scope-search"?: string;
          "scope-tags"?: string;
        },
        HTMLElement
      >;
      "gspro-item-card": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          "item-id"?: string;
        },
        HTMLElement
      >;
      "gspro-item-list": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          search?: string;
          tags?: string;
          category?: string;
          group?: string;
          size?: string;
          route?: string;
        },
        HTMLElement
      >;
      "gspro-wishlist": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};
