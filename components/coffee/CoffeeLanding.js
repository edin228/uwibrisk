import Image from "next/image";

import styles from "../../styles/Hotels.module.css";
import coffee from "../../styles/Coffee.module.css";
import { TEAM } from "../hotels/content";
import { ButtonLink, Eyebrow, LandingPage } from "../hotels/HotelsShell";
import CoffeeContactForm from "./CoffeeContactForm";

const HOME = "/coffee-and-contracts";

const COFFEE_BRAND = {
  home: HOME,
  label: "Coffee & Contracts",
  descriptor: ["Coffee &", "contracts"],
  navLabel: "Coffee & Contracts",
  nav: [
    { label: "About", href: `${HOME}#about` },
    { label: "Who we serve", href: `${HOME}#who-we-serve` },
    { label: "Our approach", href: `${HOME}#approach` },
    { label: "Team", href: `${HOME}#team` },
  ],
  cta: { label: "Get a quick quote", href: `${HOME}#contact` },
  tagline: "Coffee & Contracts, a division of UWIB. Insurance and risk guidance for the specialty coffee community.",
  footerColumns: [
    [
      ["About", `${HOME}#about`],
      ["Who we serve", `${HOME}#who-we-serve`],
      ["Our approach", `${HOME}#approach`],
    ],
    [
      ["Team", `${HOME}#team`],
      ["Privacy", "/privacy-policy"],
      ["Licensing", "/licenses"],
    ],
  ],
};

const ABOUT_POINTS = [
  {
    number: "01",
    title: "Founded for coffee in 2012",
    text: "Over twenty years, we had become the insurance brokers and advisers to many leading US specialty coffee wholesalers, third-wave coffee bars, roasters and importers. Coffee & Contracts made it official.",
  },
  {
    number: "02",
    title: "Coffee insight, applied",
    text: "We bring years of insight from the coffee world to every account, with one goal: to serve our clients expertly.",
  },
  {
    number: "03",
    title: "Tailored service, no added cost",
    text: "Because of our focus, these services come at no additional cost, and our free review often helps clients save money right away.",
  },
];

const DIFFERENTIATORS = [
  ["01", "Insight", "We’ve learned valuable lessons along the way and use common sense to solve problems."],
  ["02", "Experience", "More than two decades advising coffee importers, roasters, wholesalers and retailers."],
  ["03", "Passion", "We know a gibraltar from a flat white, and that attention to detail shows up in your program."],
];

const BUSINESS_TYPES = [
  {
    number: "01",
    icon: "importer",
    title: "Green coffee importers",
    text: "Cargo and stock throughput, warehouse exposures, contract terms with growers and buyers.",
  },
  {
    number: "02",
    icon: "roaster",
    title: "Roasters & wholesalers",
    text: "Roasting equipment, product liability, wholesale accounts, delivery fleets and supplier contracts.",
  },
  {
    number: "03",
    icon: "cafe",
    title: "Cafés & coffee bars",
    text: "General liability, property, equipment breakdown, staff and the lease terms behind each location.",
  },
  {
    number: "04",
    icon: "people",
    title: "Your people & payroll",
    text: "Workers’ compensation, employment practices and help with labor rules as your team grows.",
  },
];

const PROCESS = [
  ["01 / IDENTIFY", "Find what matters most.", "We uncover your most critical needs, from the roaster floor to the lease, and address them first."],
  ["02 / EVALUATE", "Compare real options.", "We customize a program so you can weigh your options side by side, in plain language."],
  ["03 / SUPPORT", "Stay beside you.", "We keep advising as you add locations, accounts and people, through claims and renewals."],
];

function BusinessIcon({ type }) {
  if (type === "roaster") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c.8 3.6 5 5.4 5 10.2a5 5 0 0 1-10 0c0-2.3 1.1-3.8 2.4-4.8.3 1.6 1 2.5 2 2.9C10.9 8.8 11 6 12 3z" /></svg>;
  }
  if (type === "cafe") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 9.5h11v4.5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM15.5 10.5h1.5a2.5 2.5 0 0 1 0 5h-1.5M8.5 3.5c-.7.9-.7 2 0 3M12 3.5c-.7.9-.7 2 0 3" /></svg>;
  }
  if (type === "people") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.3" /><path d="M3.5 19c.5-4 2.3-6 5.5-6s5 2 5.5 6M14 14c3-.6 5.3 1 6 4" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7.5 12 3.5l9 4v9l-9 4-9-4zM3 7.5l9 4 9-4M12 11.5v9" /></svg>;
}

export default function CoffeeLanding({ formId, initialEmail }) {
  return (
    <LandingPage brand={COFFEE_BRAND}>
      <section className={styles.landingHero}>
        <div className={styles.heroCopy}>
          <Eyebrow>Specialty coffee insurance · Since 2012</Eyebrow>
          <h1>Insurance advice,<br />brewed for coffee.</h1>
          <p>Insurance, labor and risk guidance for the coffee businesses we know best: importers, roasters, wholesalers and cafés.</p>
          <div className={styles.heroActions}>
            <ButtonLink href="#contact">Get a quick quote →</ButtonLink>
            <a href="#team" className={styles.textLink}>Meet the coffee team</a>
          </div>
          <div className={styles.heroTrust}><span />A division of UWIB · Specialty Coffee Association members</div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/coffee-and-contracts/hero-coffee-cup.jpg"
            alt="Steaming cup of black coffee on a wooden table"
            layout="fill"
            objectFit="cover"
            objectPosition="right center"
            priority
          />
          <span>From green coffee to the last pour</span>
        </div>
      </section>

      <section className={styles.credibilityStrip} aria-label="Specialty coffee focus">
        <div>Specialty coffee, since 2012</div>
        <div>Specialty Coffee Association members</div>
        <div>Two decades advising coffee businesses</div>
      </section>

      <section className={coffee.aboutSection} id="about">
        <div className={coffee.aboutIntro}>
          <div>
            <Eyebrow>What we’re about</Eyebrow>
            <h2>Partners for the business behind the bar.</h2>
          </div>
          <p>We see ourselves as partners to small and mid-sized coffee businesses facing today’s labor and insurance complexities.</p>
        </div>
        <div className={coffee.aboutImage}>
          <Image
            src="/coffee-and-contracts/coffee-shop.jpg"
            alt="Specialty coffee bar with an espresso machine and a latte on the counter"
            layout="fill"
            objectFit="cover"
            objectPosition="center 55%"
          />
        </div>
        <div className={coffee.aboutPoints}>
          {ABOUT_POINTS.map((point) => (
            <article key={point.number}>
              <span className={styles.itemNumber}>{point.number}</span>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.briefFeature}>
        <div className={coffee.featurePhoto}>
          <Image
            src="/coffee-and-contracts/coffee-and-notebook.jpg"
            alt="Latte beside a notebook and pen overlooking the coast"
            layout="fill"
            objectFit="cover"
            objectPosition="right center"
          />
        </div>
        <div className={styles.briefFeatureCopy}>
          <Eyebrow light>What we do that’s different</Eyebrow>
          <h2>Two decades of coffee, applied to your insurance.</h2>
          <p>Our real-world experience in coffee shapes a practical, cost-effective set of solutions, not a generic package.</p>
          <div className={coffee.differentiators}>
            {DIFFERENTIATORS.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.riskSection} id="who-we-serve">
        <div className={styles.sectionIntroSplit}>
          <div>
            <Eyebrow>Who we serve</Eyebrow>
            <h2>From origin to<br />the espresso bar.</h2>
          </div>
          <p>We work with small and mid-sized coffee businesses at every step of the supply chain, and we understand how their risks connect.</p>
        </div>
        <div className={styles.riskGrid}>
          {BUSINESS_TYPES.map((item) => (
            <article key={item.number}>
              <span className={styles.riskIcon}><BusinessIcon type={item.icon} /></span>
              <span className={styles.itemNumber}>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processSection} id="approach">
        <div className={`${styles.processIntro} ${coffee.processIntroStacked}`}>
          <Eyebrow>How we work</Eyebrow>
          <h2>We know a gibraltar from a flat white. And a gap in your coverage.</h2>
        </div>
        <div className={styles.processGrid}>
          {PROCESS.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.teamSection} id="team">
        <div className={styles.teamIntro}>
          <div><Eyebrow light>Meet your coffee team</Eyebrow><h2>Coffee people, with an insurance brokerage behind them.</h2></div>
          <p>Coffee &amp; Contracts clients work with a dedicated account executive, backed by the UWIB service team and roots in risk management dating to 1918.</p>
        </div>
        <div className={styles.teamRoster}>
          <article className={styles.ericCard}>
            <div className={coffee.leadPhoto}><Image src="/coffee-and-contracts/josh-acosta.jpg" alt="Josh Acosta" layout="fill" objectFit="cover" objectPosition="center 30%" /></div>
            <div><h3>Josh Acosta</h3><span>Account Executive</span></div>
            <p>Josh leads Coffee &amp; Contracts and is your first call for coverage, renewals and new locations. A Specialty Coffee Association member based in Tennessee, he takes his espresso single-origin.</p>
            <dl className={coffee.leadContact}>
              <div><dt>Email</dt><dd><a href="mailto:josh@uwib.com">josh@uwib.com</a></dd></div>
              <div><dt>Phone</dt><dd><a href="tel:+16152340347">(615) 234-0347</a></dd></div>
            </dl>
          </article>
          <div className={styles.serviceTeam}>
            <div><Eyebrow light>Your day-to-day team</Eyebrow><h3>Coffee service, with a team you know and direct access.</h3></div>
            <div className={styles.teamGrid}>
              {TEAM.map((member) => (
                <article key={member.name}>
                  <div className={styles.teamPhoto}><Image src={member.image} alt={member.name} layout="fill" objectFit="cover" /></div>
                  <h4>{member.name}</h4><span>{member.role}</span>
                </article>
              ))}
            </div>
            <p className={styles.teamSupport}>Together, the team supports policy changes, certificates and documentation, carrier coordination, renewal preparation and the questions that come up between renewal dates.</p>
          </div>
        </div>
      </section>

      <section className={styles.contactSection} id="contact">
        <div className={styles.contactIntro}>
          <Eyebrow>Let’s get started</Eyebrow>
          <h2>We’re ready when you are.</h2>
          <p>Tell us a little about your coffee business. Josh will follow up with a focused conversation and a free review of your current program.</p>
          <div className={coffee.directContact}>
            <strong>Prefer to talk directly?</strong>
            <a href="mailto:josh@uwib.com">josh@uwib.com</a>
            <a href="tel:+16152340347">(615) 234-0347</a>
          </div>
          <figure className={coffee.contactPhoto}>
            <Image
              src="/coffee-and-contracts/coffee-mug.jpg"
              alt="Steaming coffee mug beside a French press"
              layout="fill"
              objectFit="cover"
              objectPosition="70% 60%"
            />
          </figure>
        </div>
        <CoffeeContactForm formId={formId} initialEmail={initialEmail} />
      </section>
    </LandingPage>
  );
}
