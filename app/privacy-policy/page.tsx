import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { createPageMetadata } from "@/lib/metadata";
import { business } from "@/lib/site-data";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Connecticut Party Rentals collects, uses, and protects information you submit through our website quote and contact forms.",
  path: "/privacy-policy",
});

const sectionTitle = "mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-[#8a6d3a]";
const body = "mt-3 text-sm leading-relaxed text-stone-700 sm:text-[0.9375rem]";
const list = "mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone-700 sm:text-[0.9375rem]";

export default function PrivacyPolicyPage() {
  const siteHost = business.websiteUrl.replace(/^https?:\/\//, "");
  const lastUpdated = "May 27, 2026";

  return (
    <section className="border-b border-stone-200/80 bg-[#faf9f7] py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

        <header className="mt-6 border-b border-stone-200/80 pb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl [font-family:var(--font-display)]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-stone-500">Last updated: {lastUpdated}</p>
          <p className={`${body} mt-4`}>
            This policy describes how <strong>{business.name}</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) handles personal information collected through {siteHost} and related inquiry forms. It
            applies to quote requests, consultation bookings, and other information you choose to send us online.
          </p>
        </header>

        <div className="pb-10">
          <h2 className={sectionTitle}>Information we collect</h2>
          <p className={body}>
            When you submit a quote, consultation request, or contact form, we may collect information you provide,
            such as:
          </p>
          <ul className={list}>
            <li>Name and contact details (email address, phone number)</li>
            <li>Event details (date, location, guest count, event type, setup notes)</li>
            <li>Any optional message or description you include in the form</li>
            <li>Technical data our hosting and security systems log automatically (for example, browser type, IP address, and page requests)</li>
          </ul>
          <p className={body}>
            We do not require you to create an account to request a quote. Do not submit sensitive identifiers (such as
            payment card numbers) through our website forms.
          </p>

          <h2 className={sectionTitle}>How we use your information</h2>
          <p className={body}>We use the information you submit to:</p>
          <ul className={list}>
            <li>Respond to your inquiry and prepare rental quotes or consultations</li>
            <li>Coordinate delivery, setup, and event logistics when you book with us</li>
            <li>Follow up by phone, email, or text when you have asked us to contact you</li>
            <li>Improve our website, forms, and customer service</li>
            <li>Meet legal, accounting, or safety obligations when applicable</li>
          </ul>

          <h2 className={sectionTitle}>Sharing with third parties</h2>
          <p className={body}>
            <strong>We do not sell your personal information.</strong> We do not share your information with third
            parties for their own marketing purposes without your consent.
          </p>
          <p className={body}>
            We may share information only in these limited situations:
          </p>
          <ul className={list}>
            <li>
              <strong>Service providers</strong> that help us operate our business (for example, website hosting, form
              email delivery, or analytics tools). These providers may process data on our behalf under contractual
              obligations to protect it and use it only for the services they provide to us.
            </li>
            <li>
              <strong>When you ask us to</strong>, such as coordinating with a venue, planner, or vendor you have
              identified for your event.
            </li>
            <li>
              <strong>When required by law</strong>, such as responding to a valid legal request or protecting the
              rights and safety of our customers, staff, or the public.
            </li>
            <li>
              <strong>Business transfers</strong>, if ownership or structure of the business changes, subject to
              appropriate confidentiality protections.
            </li>
          </ul>

          <h2 className={sectionTitle}>Cookies and analytics</h2>
          <p className={body}>
            Our website may use cookies and similar technologies to measure traffic, understand how pages are used, and
            support advertising or conversion measurement (for example, Google Ads or Google Tag Manager when enabled).
            You can control cookies through your browser settings. Blocking cookies may affect some site features but
            will not prevent you from submitting a quote request by phone or email.
          </p>

          <h2 className={sectionTitle}>How long we keep information</h2>
          <p className={body}>
            We retain inquiry and booking-related information for as long as needed to respond to you, maintain business
            records, resolve disputes, and comply with applicable laws. If you did not become a customer, we may delete
            or anonymize older inquiries after a reasonable period.
          </p>

          <h2 className={sectionTitle}>Your choices</h2>
          <p className={body}>You may:</p>
          <ul className={list}>
            <li>Request access to, correction of, or deletion of personal information we hold about you, subject to legal exceptions</li>
            <li>Opt out of non-essential marketing messages by replying STOP to texts or using unsubscribe instructions in emails</li>
            <li>Contact us directly instead of using the online form at any time</li>
          </ul>
          <p className={body}>
            To exercise these choices, contact us using the details below. We may need to verify your identity before
            fulfilling certain requests.
          </p>

          <h2 className={sectionTitle}>Children&apos;s privacy</h2>
          <p className={body}>
            Our services are directed to adults planning events. We do not knowingly collect personal information from
            children under 13 through this website. If you believe a child has submitted information to us, please
            contact us so we can delete it.
          </p>

          <h2 className={sectionTitle}>Security</h2>
          <p className={body}>
            We use reasonable administrative, technical, and physical safeguards to protect information submitted
            through our site. No method of transmission over the internet is completely secure; we cannot guarantee
            absolute security.
          </p>

          <h2 className={sectionTitle}>Changes to this policy</h2>
          <p className={body}>
            We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the top will
            change when we do. Continued use of our forms after an update means you accept the revised policy.
          </p>

          <h2 className={sectionTitle}>Contact us</h2>
          <p className={body}>
            Questions about this policy or your information:
          </p>
          <ul className={`${list} list-none pl-0`}>
            <li>
              <strong>{business.name}</strong>
            </li>
            <li>
              {business.address}, {business.primaryCity}, {business.state} {business.postalCode}
            </li>
            <li>
              Email:{" "}
              <a href={`mailto:${business.email}`} className="font-medium text-stone-900 underline underline-offset-2">
                {business.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href={business.phoneHref} className="font-medium text-stone-900 underline underline-offset-2">
                {business.phone}
              </a>
            </li>
          </ul>
          <p className={`${body} mt-6 text-stone-500`}>
            <Link href="/contact#quote" className="text-stone-600 underline underline-offset-2 hover:text-stone-900">
              Return to quote form
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
