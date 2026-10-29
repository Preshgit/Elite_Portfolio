import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { site } from "@/lib/site";

// Starting draft — have it reviewed by a lawyer for the countries you serve.

export const metadata: Metadata = {
  title: "Risk Disclaimer",
  description: "Important information about the risks of trading and investing.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Risk Disclaimer"
      updated="October 2026"
      intro={`Trading and investing in cryptocurrencies, forex, stocks and other financial instruments carries a high level of risk. You can lose some or all of the money you put in. Please read this page before using any service from ${site.name}.`}
      sections={[
        {
          heading: "Not financial advice",
          body: [
            "Everything on this website, in our mentorship, classes, videos, livestreams, Telegram and social media channels is for education and information only. It is not personal financial, investment, tax or legal advice.",
            "You are responsible for your own decisions. Consider speaking to a licensed financial adviser before you invest.",
          ],
        },
        {
          heading: "Past results do not guarantee future returns",
          body: [
            "Trade histories, win rates, payout screenshots and testimonials shown on this site reflect past results. They are not a promise or guarantee of what you will earn. Individual results vary.",
          ],
        },
        {
          heading: "High risk and volatility",
          body: [
            "Crypto markets are volatile and can move sharply in short periods. Leveraged products and prop-firm challenges can magnify losses. Only trade with money you can afford to lose.",
          ],
        },
        {
          heading: "Private trading investments",
          body: [
            "Any capital management arrangement is subject to a separate written agreement that sets out fees, risks and payout terms. Nothing on this website is an offer to manage funds without that agreement.",
          ],
        },
        {
          heading: "Third-party platforms",
          body: [
            "We may mention or partner with exchanges, prop firms and other platforms. We are not responsible for their services, and partnership links may earn us a commission.",
          ],
        },
        {
          heading: "Questions",
          body: [`Contact us at ${site.email} if you have any questions about these risks.`],
        },
      ]}
    />
  );
}
