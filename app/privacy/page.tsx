import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { site } from "@/lib/site";

// Starting draft — have it reviewed by a lawyer (e.g. for NDPA / GDPR).

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses your information.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      intro={`This policy explains what information ${site.name} collects through this website and how it is used.`}
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you use the contact form we receive your name, email address and message. When you contact us by email, phone, WhatsApp or Telegram we receive the details you share there.",
            "Our hosting provider may keep basic technical logs (such as IP address and browser type) to keep the site secure and running.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your details only to reply to you and provide the services you ask for. We do not sell your information.",
          ],
        },
        {
          heading: "Third-party services",
          body: [
            "This site embeds content from services such as Vimeo and links to platforms such as Medium, Telegram, YouTube, X, Instagram and TikTok. Those services have their own privacy policies.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `You can ask us to see, correct or delete the information we hold about you by emailing ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
