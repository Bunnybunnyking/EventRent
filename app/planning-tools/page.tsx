import { permanentRedirect } from "next/navigation";

/** Legacy alias; canonical hub is `/planning` (not listed in sitemap.xml). */
export default function PlanningToolsRedirectPage() {
  permanentRedirect("/planning");
}
