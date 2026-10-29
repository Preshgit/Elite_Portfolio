import Headings from "../../headings";
import { Check } from "lucide-react";

const ExperiencesArray: IProfessionalExperience[] = [
  {
    date: "2025 - PRESENT",
    title: "Pumpkin DEX - Brand Partner",
    achievements: [
      "Livestream 3 times a week on the platform, teaching and analysing the technical analysis of the crypto and the commodity Markets.",
      "Collaborated with the internal team to drive narrative driven promotional contents to drive sign-ups and Volume on the DEX.",
    ],
  },
  {
    date: "2026",
    title: "Mubite Prop Firm — Brand Partner & Video Creator",
    achievements: [
      "Produced and edited short-form content showcasing trading benefits of the Prop Firm, driving a 30% follower growth on the brand’s African exposure within 3 months.",
      "Designed content strategies and performance reports that improved campaign consistency and visual brand identity across all touchpoints.",
      "Collaborated with internal marketing teams to develop narrative-driven promotional videos that strengthened lead acquisition.",
    ],
  },

  {
    date: "2025 - 2026",
    title: "Blueberry Funded — Brand Partner & Video Creator",
    achievements: [
      "Produced and edited short-form content showcasing trading benefits, driving a 35% follower growth on the brand’s TikTok handle within 3 months.",
      "Designed content calendars and performance reports that improved campaign consistency and visual brand identity across all touchpoints.",
      "Collaborated with internal creative teams to develop narrative-driven promotional videos that strengthened lead acquisition.",
    ],
  },
  {
    date: "2023 - PRESENT",
    title: "Bybit Exchange — Affiliate & Content Creator",
    achievements: [
      "Generated over $2.1M trading volume through affiliate-driven campaigns and targeted content strategies.",
      "Onboarded nearly 200 verified traders through organic content on YouTube, TikTok, and Telegram.",
      "Developed 20+ crypto explainer videos that simplified trading tools, leading to a 22% click-through rate improvement on referral links.",
      "Partnered with Bybit’s marketing division to amplify campaigns, achieving an average engagement rate of 8.5% per post.",
    ],
  },
  {
    date: "2023 - 2025",
    title: "OptionFlow Finance — Community Moderator",
    achievements: [
      "Oversaw Discord and Telegram channels exceeding 25,000 members, maintaining high engagement and reducing spam incidents by 60% through structured moderation systems.",
      "Created announcement campaigns that consistently reached 90%+ message visibility, enhancing investor confidence and communication clarity.",
      "Developed and executed FAQ automation workflow, decreasing repetitive inquiries by 40%, freeing developer time for core operations.",
      "Collaborated with the marketing team to deliver promotional content and partnership updates, resulting in a 15% monthly increase in returning community users.",
    ],
  },
  {
    date: "2022 - 2025",
    title: "MuesliSwap DEX (Cardano) — Community Manager",
    achievements: [
      "Managed multi-channel communication hubs (Discord, X & Telegram) with 12K+ combined members, achieving 25% higher weekly engagement rate via active discussions and contests.",
      "Authored over 50+ project announcements and partnership updates, contributing to steady liquidity inflow and consistent trading volume growth.",
      "Designed and launched user education initiatives (“Ask Me Anything” sessions & beginner threads), increasing new-user retention by 18% within two months.",
      "Collaborated with the core dev team to communicate technical updates in digestible content formats for both retail and institutional investors.",
    ],
  },
];

const Experiences = () => {
  return (
    <section id="professional-experiences" className="relative mx-auto max-w-7xl gutter py-16 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Headings text="Experience" textClassName="text-white" />
          <h2
            data-fx="words"
            className="unbounded mt-6 text-balance text-[30px] font-bold leading-[105%] tracking-[-0.06em] md:text-[44px]"
          >
            Where I&apos;ve put in the work.
          </h2>
          <p data-fx="rise" className="jost mt-5 max-w-[36ch] text-[18px] leading-[145%] text-white/65">
            Brand partnerships, affiliate campaigns and community roles across
            exchanges, prop firms and DEXs.
          </p>
        </div>

        <ol className="relative space-y-6 border-l border-white/15 pl-6 md:pl-10">
          {ExperiencesArray.map((experience) => (
            <ProfessionalExperience {...experience} key={experience.title} />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experiences;

interface IProfessionalExperience {
  date: string;
  title: string;
  achievements: string[];
}

function ProfessionalExperience({ date, title, achievements }: IProfessionalExperience) {
  // "Company — Role" or "Company - Role"
  const [company, role] = title.split(/s+[—-]s+/);

  return (
    <li data-fx="rise" className="relative">
      <span
        aria-hidden
        className="absolute -left-[31px] top-8 size-3.5 rounded-full border-[3px] border-black bg-[#F8A308] ring-1 ring-[#F8A308]/60 md:-left-[47px]"
      />
      <article className="rounded-[28px] border border-white/15 bg-[#0b0a10] p-6 transition-colors duration-200 hover:border-[#F8A308]/50 md:p-8">
        <p className="jost inline-flex rounded-full border border-[#F8A308]/40 px-3 py-1 text-[13px] tracking-[0.08em] text-[#F8A308]">
          {date}
        </p>
        <h3 className="unbounded mt-4 text-[19px] font-semibold leading-[125%] tracking-[-0.04em] text-white md:text-[24px]">
          {company}
        </h3>
        {role && <p className="jost mt-1 text-[16px] text-white/55 md:text-[17px]">{role}</p>}
        <ul className="mt-6 space-y-3.5">
          {achievements.map((achievement, index) => (
            <li key={index} className="jost flex items-start gap-3 text-[16px] leading-[150%] text-white/70 md:text-[17px]">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-[#F8A308]" />
              {achievement}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
