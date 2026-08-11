import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/Hotels.module.css";
import { BRIEFS, COVERAGE_AREAS, HOTEL_PATHS, TEAM } from "./content";
import HotelsContactForm from "./HotelsContactForm";
import { ButtonLink, Eyebrow, HotelPage } from "./HotelsShell";
import RiskBriefCover from "./RiskBriefCover";

const RISK_CATEGORIES = [
  {
    number: "01",
    icon: "property",
    title: "Property & guest protection",
    text: "Buildings, contents, equipment breakdown, guest liability, liquor and umbrella.",
  },
  {
    number: "02",
    icon: "people",
    title: "Your people & their well-being",
    text: "Workers’ compensation, employment practices liability, benefits and safety strategy.",
  },
  {
    number: "03",
    icon: "operations",
    title: "Operational resilience",
    text: "Business interruption, equipment failure, vendor exposures and continuity planning.",
  },
  {
    number: "04",
    icon: "security",
    title: "Property & cyber security",
    text: "Guest data, payment systems, privacy events, social engineering and incident response.",
  },
];

const PROCESS = [
  ["01 / UNDERSTAND", "See the whole operation.", "We learn the property, people, amenities, contracts and plans behind the guest experience."],
  ["02 / DESIGN", "Connect coverage to reality.", "We identify gaps, simplify tradeoffs and build an insurance program with intent."],
  ["03 / STAY CLOSE", "Keep pace with the property.", "As operations evolve, we remain available for decisions, claims and renewal strategy."],
];

function RiskIcon({ type }) {
  if (type === "people") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.3" /><path d="M3.5 19c.5-4 2.3-6 5.5-6s5 2 5.5 6M14 14c3-.6 5.3 1 6 4" /></svg>
    );
  }
  if (type === "operations") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="1" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
  }
  if (type === "security") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2.5" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9 20v-5h6v5" /></svg>;
}

export default function HotelsLanding({ formId, initialEmail }) {
  return (
    <HotelPage>
      <section className={styles.landingHero}>
        <div className={styles.heroCopy}>
          <Eyebrow>California hospitality insurance</Eyebrow>
          <h1>Protect the place<br />people remember.</h1>
          <p>Insurance and risk guidance designed around the realities of independent hotels, from guest experience and property protection to workers’ compensation and cyber risk.</p>
          <div className={styles.heroActions}>
            <ButtonLink href="#contact">Request a coverage review →</ButtonLink>
            <Link href={HOTEL_PATHS.coverage}><a className={styles.textLink}>Explore hotel coverage</a></Link>
          </div>
          <div className={styles.heroTrust}><span />Independent guidance · California expertise · Human service</div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/hotels/california-boutique-hotel-hero-final.png"
            alt="California boutique hotel exterior at evening"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            priority
          />
          <span>Built for independent properties</span>
        </div>
      </section>

      <section className={styles.credibilityStrip} aria-label="California hospitality focus">
        <div>Focused on California hospitality</div>
        <div>CHLA vendor-member community</div>
        <div>Boutique Hotels of California access</div>
      </section>

      <section className={styles.riskSection}>
        <div className={styles.sectionIntroSplit}>
          <div>
            <Eyebrow>A hotel is never just a building</Eyebrow>
            <h2>One property.<br />A hundred moving parts.</h2>
          </div>
          <p>We help connect the risks that are too often handled in isolation, so your coverage reflects how your hotel actually operates.</p>
        </div>
        <div className={styles.riskGrid}>
          {RISK_CATEGORIES.map((item) => (
            <article key={item.number}>
              <span className={styles.riskIcon}><RiskIcon type={item.icon} /></span>
              <span className={styles.itemNumber}>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.briefFeature}>
        <RiskBriefCover />
        <div className={styles.briefFeatureCopy}>
          <Eyebrow light>Useful before it’s urgent</Eyebrow>
          <h2>Risk guidance made for the people running the property.</h2>
          <p>Our California Hospitality Risk Brief turns claims patterns and operational pressure points into practical conversations for owners, general managers and department leaders.</p>
          <div className={styles.topicTags}>
            <span>Insurance awareness</span><span>Employee well-being</span><span>Operational excellence</span><span>Cyber security</span>
          </div>
          <Link href={BRIEFS["housekeeping-injuries"].path}><a className={styles.yellowLink}>Read the latest brief →</a></Link>
        </div>
      </section>

      <section className={styles.coveragePreview}>
        <div className={styles.coveragePreviewIntro}>
          <Eyebrow>Coverage, connected</Eyebrow>
          <h2>Built around the way your hotel works.</h2>
          <p>Independent properties rarely fit cleanly into a standard package. We start with the operation, then shape the insurance program around it.</p>
          <span className={styles.yellowRule} />
        </div>
        <div className={styles.coveragePreviewList}>
          {COVERAGE_AREAS.map((area) => (
            <Link href={`${HOTEL_PATHS.coverage}#${area.id}`} key={area.id}>
              <a>
                <span>{area.number}</span>
                <div><h3>{area.title}</h3><p>{area.includes.join(", ")}</p></div>
                <strong aria-hidden="true">→</strong>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.processIntro}>
          <Eyebrow>A clearer insurance process</Eyebrow>
          <h2>Thoughtful advice. No hospitality-industry translation required.</h2>
        </div>
        <div className={styles.processGrid}>
          {PROCESS.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.teamSection} id="team">
        <div className={styles.teamIntro}>
          <div><Eyebrow light>Meet your hospitality team</Eyebrow><h2>A relationship with a team, not a handoff.</h2></div>
          <p>Boutique hotel clients work with people who know the account, understand the operation and stay close to day-to-day needs.</p>
        </div>
        <div className={styles.teamRoster}>
          <article className={styles.ericCard}>
            <div className={styles.ericPhoto}><Image src="/hotels/team/eric-schirding.png" alt="Eric Schirding" layout="fill" objectFit="cover" /></div>
            <div><h3>Eric Schirding</h3><span>Co-Founder</span></div>
            <p>Eric helps set the direction for UWIB’s hospitality practice and makes sure clients are connected with the right people from the beginning.</p>
            <Link href="/team/eric-schirding"><a>Meet Eric →</a></Link>
          </article>
          <div className={styles.serviceTeam}>
            <div><Eyebrow light>Your day-to-day team</Eyebrow><h3>Hospitality service, with familiar names and direct access.</h3></div>
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
          <Eyebrow>Start with a conversation</Eyebrow>
          <h2>Let’s look at the risk behind the reservation.</h2>
          <p>Tell us a little about your property. We’ll follow up with a focused conversation: no generic pitch, no pressure.</p>
          <div><strong>Prefer email?</strong><a href="mailto:helpdesk@uwib.com">helpdesk@uwib.com</a><span>California service team</span></div>
        </div>
        <HotelsContactForm formId={formId} initialEmail={initialEmail} />
      </section>
    </HotelPage>
  );
}
