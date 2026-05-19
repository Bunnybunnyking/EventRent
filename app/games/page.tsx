import { permanentRedirect } from "next/navigation";

/** Legacy short URL; canonical hub is `/party-games-tools` (not listed in sitemap.xml). */
export default function GamesRedirectPage() {
  permanentRedirect("/party-games-tools");
}
