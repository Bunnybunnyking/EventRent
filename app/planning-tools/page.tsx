import { redirect } from "next/navigation";

/** Entry point linked from the tent & seating reference; hub lives at `/planning`. */
export default function PlanningToolsRedirectPage() {
  redirect("/planning");
}
