import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../components/LegalPage";
import { site } from "@/lib/site";

// Starting draft — have it reviewed by a lawyer.

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms for using the ${site.name} website and services.`,
};

export default function TermsPage() {
  return (
    <>
      <LegalPage
        title="Terms and Conditions"
        updated="October 2026"
        intro={`By using this website or booking a service with ${site.name}, you agree to these terms.`}
        sections={[
          {
            heading: "Services",
            body: [
              "Consulting, mentorship, content creation and community services are provided as described at the time of booking. Specific deliverables, prices and timelines are confirmed with you directly before work begins.",
            ],
          },
          {
            heading: "Payments and refunds",
            body: [
              "Fees are shown on the site or agreed in writing. Unless agreed otherwise, one-time fees (such as lifetime mentorship) are non-refundable once access has been given.",
            ],
          },
          {
            heading: "Education only",
            body: [
              "All trading content is educational and is not financial advice. See the Risk Disclaimer for details.",
            ],
          },
          {
            heading: "Content",
            body: [
              "Course material, videos and strategies are for your personal use. Please do not resell or redistribute them without permission.",
            ],
          },
          {
            heading: "Contact",
            body: [`Questions about these terms can be sent to ${site.email}.`],
          },
        ]}
      />
      <p className="bg-black pb-16 text-center jost text-white/50">
        Read the{" "}
        <Link href="/disclaimer" className="text-[#F8A308] underline">
          Risk Disclaimer
        </Link>
        .
      </p>
    </>
  );
}
