import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "gspro-wishlist-config": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          "data-url"?: string;
          "wishlist-alias"?: string;
          "show-quantity-on-card"?: string;
        },
        HTMLElement
      >;
      "gspro-item-gallery": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      "gspro-wishlist": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};
