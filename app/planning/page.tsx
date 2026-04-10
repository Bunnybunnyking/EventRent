import type { Metadata } from "next";
import { PlanningHub } from "@/components/planning-hub";
import { BreadcrumbListSchema, FAQSchemaItems, ServiceSchema } from "@/components/schema";
import { createPageMetadata, defaultOgImagePath } from "@/lib/metadata";
import { business } from "@/lib/site-data";
import { planningFaqItems } from "@/lib/planning-faq";

export const metadata: Metadata = createPageMetadata({
  title: "Connecticut Tent & Event Planning Guide | Sizing, Weather, Layout",
  description:
    "Connecticut tent planning: interactive square-footage tent size estimator (original comfort ranges) plus Quick Event Planner as a second option, capacity chart, step-by-step guide, layout examples, weather and site tips, and FAQs. Family-owned event rental team since 1946.",
  path: "/planning",
  ogImage: defaultOgImagePath,
});

export default function PlanningPage() {
  return (
    <>
      <ServiceSchema
        name="Tent and event planning guidance in Connecticut"
        description={`Expert planning help for tent size, layout, weather readiness, and rental coordination across ${business.state}.`}
        path="/planning"
      />
      <FAQSchemaItems items={planningFaqItems} />
      <BreadcrumbListSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Planning", path: "/planning" },
        ]}
      />
      <PlanningHub />
    </>
  );
}
