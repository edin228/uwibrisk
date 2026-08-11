import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "../../styles/Hotels.module.css";
import { BRIEFS, BRIEF_LIST, COVERAGE_AREAS, HOTEL_PATHS } from "./content";
import { ButtonLink, Eyebrow, HotelPage } from "./HotelsShell";
import RiskBriefCover from "./RiskBriefCover";

const WHY_POINTS = [
  ["01", "We learn the operation.", "Guest flow, amenities, food and beverage, employees, contracts, renovations and growth plans."],
  ["02", "We make tradeoffs clear.", "What each option protects, what it leaves exposed and why the difference matters."],
  ["03", "We stay useful all year.", "Risk questions, contract reviews, claims conversations and operational changes do not wait for renewal."],
  ["04", "We advocate when it counts.", "A claim is not a handoff. We help you navigate the process and keep the business context visible."],
];

const ADVISOR_STAGES = [
  ["01", "Discovery", "Property, operations and priorities"],
  ["02", "Program design", "Options, gaps and clear tradeoffs"],
  ["03", "Active service", "Changes, contracts and questions"],
  ["04", "Claims advocacy", "Context, communication and follow-through"],
];

function NewsletterSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`${HOTEL_PATHS.home}?email=${encodeURIComponent(email)}#contact`);
  };

  return (
    <form className={styles.newsletterCard} onSubmit={handleSubmit}>
      <Eyebrow>Get the next issue</Eyebrow>
      <h2>One practical risk conversation each month.</h2>
      <label>
        <span className={styles.srOnly}>Work email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Work email"
          required
        />
      </label>
      <button type="submit">Subscribe →</button>
    </form>
  );
}

export function WhyUwibPage() {
  return (
    <HotelPage>
      <section className={styles.whyHero}>
        <div>
          <Eyebrow>Why UWIB for boutique hotels</Eyebrow>
          <h1>Insurance advice that starts with the property, not the policy.</h1>
          <p>Independent hotels ask more of their insurance partner. We bring curiosity, continuity and practical risk thinking to the relationship.</p>
        </div>
        <aside>
          <Eyebrow light>Our point of view</Eyebrow>
          <h2>The best insurance conversations happen long before a claim or renewal deadline.</h2>
          <p>California expertise · Independent guidance · Responsive service</p>
        </aside>
      </section>

      <section className={styles.whyPointsSection}>
        <div className={styles.sectionIntroSplit}>
          <h2>A specialist mindset without the specialist-language barrier.</h2>
          <p>You get an advisor who understands hospitality operations and explains insurance decisions plainly.</p>
        </div>
        <div className={styles.whyPoints}>
          {WHY_POINTS.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.advisorStages}>
        <div><Eyebrow light>From renewal to claim</Eyebrow><h2>One advisor relationship across the moments that shape your risk.</h2></div>
        <div className={styles.stageGrid}>
          {ADVISOR_STAGES.map(([number, title, text]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.supportingCta}>
        <h2>See how this approach shapes a hotel insurance program.</h2>
        <ButtonLink href={HOTEL_PATHS.coverage}>Explore coverage →</ButtonLink>
      </section>
    </HotelPage>
  );
}

export function CoveragePage() {
  return (
    <HotelPage>
      <section className={styles.coverageHero}>
        <div><Eyebrow>Boutique hotel coverage</Eyebrow><h1>Connected coverage for a connected operation.</h1></div>
        <p>The goal is not more policies. It is fewer blind spots and a program that makes sense as one whole.</p>
      </section>
      <nav className={styles.coverageJump} aria-label="Jump to coverage section">
        <strong>Jump to</strong>
        {COVERAGE_AREAS.map((area) => <a href={`#${area.id}`} key={area.id}>{area.title.replace(" & business income", "").replace("General & liquor liability", "Liability").replace("Workers’ compensation", "Workers’ comp").replace("Cyber & privacy", "Cyber")}</a>)}
      </nav>
      <div className={styles.coverageRows}>
        {COVERAGE_AREAS.map((area, index) => (
          <section className={`${styles.coverageRow} ${area.dark ? styles.coverageRowDark : ""} ${index % 2 ? styles.coverageRowTint : ""}`} id={area.id} key={area.id}>
            <div className={styles.coverageRowTitle}><span>{area.number}</span><h2>{area.title}</h2></div>
            <p>{area.summary}</p>
            <div><Eyebrow light={area.dark}>Often includes</Eyebrow><ul>{area.includes.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </section>
        ))}
      </div>
      <section className={styles.coverageCta}>
        <div><Eyebrow>The right program is property-specific</Eyebrow><h2>Let’s identify what belongs in yours, and what does not.</h2></div>
        <ButtonLink href={`${HOTEL_PATHS.home}#contact`}>Request a coverage review →</ButtonLink>
      </section>
    </HotelPage>
  );
}

function BriefCard({ brief }) {
  return (
    <article className={styles.briefCard}>
      <Eyebrow>{brief.category}</Eyebrow>
      <h3>{brief.title}</h3>
      <p>{brief.description}</p>
      <Link href={brief.path}><a>Read brief →</a></Link>
    </article>
  );
}

export function RiskBriefLibraryPage() {
  const featured = BRIEFS["housekeeping-injuries"];
  return (
    <HotelPage>
      <section className={styles.libraryHero}>
        <div><Eyebrow light>California Hospitality Risk Brief</Eyebrow><h1>Practical ideas for safer, stronger hotel operations.</h1><p>Short, useful guidance for owners, general managers and department leaders, grounded in the risks we see across hospitality.</p></div>
        <NewsletterSignup />
      </section>
      <section className={styles.featuredBrief}>
        <RiskBriefCover compact />
        <div><Eyebrow>Featured issue · Employee well-being</Eyebrow><h2>{featured.title}</h2><p>Housekeeping is the backbone of every hotel experience. It is also one of the leading sources of worker injury and workers’ compensation pressure. Small process and equipment changes can make a measurable difference.</p><Link href={featured.path}><a>Read the full brief →</a></Link></div>
      </section>
      <div className={styles.topicBar}><strong>All topics</strong><span>Insurance awareness</span><span>Employee well-being</span><span>Operational excellence</span><span>Property & cyber security</span></div>
      <section className={styles.moreBriefs} id="briefs">
        <div className={styles.moreBriefsHeader}><h2>More from the brief</h2><a href="#briefs">View all issues →</a></div>
        <div className={styles.briefCards}>{BRIEF_LIST.filter((brief) => brief.slug !== featured.slug).map((brief) => <BriefCard brief={brief} key={brief.slug} />)}</div>
      </section>
      <section className={styles.darkCta}><div><Eyebrow light>A question for your property?</Eyebrow><h2>Turn the next risk brief into a conversation with an advisor.</h2></div><ButtonLink href={`${HOTEL_PATHS.home}#contact`} light>Request a review →</ButtonLink></section>
    </HotelPage>
  );
}

export function RiskBriefArticle({ brief }) {
  return (
    <HotelPage>
      <article>
        <header className={styles.articleHero}>
          <div className={styles.breadcrumb}><Link href={HOTEL_PATHS.briefs}><a>Risk Brief</a></Link> / {brief.category} / Issue {brief.issue}</div>
          <Eyebrow>{brief.label}</Eyebrow>
          <h1>{brief.title}</h1>
          <p>{brief.description}</p>
          <div className={styles.articleMeta}><span>{brief.date}</span><span>{brief.readTime}</span><span>California Hospitality Risk Brief</span></div>
        </header>

        <div className={styles.articleBody}>
          <div className={styles.articleMain}>
            <p className={styles.articleLead}>{brief.introduction}</p>
            <p>{brief.lead}</p>
            <span className={styles.yellowRule} />
            {brief.sections.map((section, index) => (
              <div className={styles.articleSection} key={section.title}>
                <h2>{section.title}</h2>
                {section.body ? <p>{section.body}</p> : null}
                {section.paragraphs ? section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : null}
                {index === 0 ? <div className={styles.questionBox}><Eyebrow>Questions to ask</Eyebrow><ul>{brief.questions.map((question) => <li key={question}>{question}</li>)}</ul></div> : null}
              </div>
            ))}
          </div>
          <aside className={styles.articleAside}>
            <div className={styles.considerBox}><Eyebrow>Question to consider</Eyebrow><p>{brief.consider}</p></div>
            <div className={styles.outlineBox}><Eyebrow>In this brief</Eyebrow><ul>{brief.outline.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <p>This material is for general risk-management discussion and is not legal, medical or insurance coverage advice.</p>
          </aside>
        </div>

        <section className={styles.checklistSection}>
          <div><Eyebrow light>Manager checklist</Eyebrow><h2>{brief.checklistTitle}</h2></div>
          <ol>{brief.checklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
        </section>

        <section className={styles.articleCta}>
          <div><Eyebrow>Keep the conversation going</Eyebrow><h2>{brief.cta}</h2></div>
          <div><ButtonLink href={`${HOTEL_PATHS.home}#contact`}>Request a review →</ButtonLink><ButtonLink href={HOTEL_PATHS.briefs} outline>Back to all briefs</ButtonLink></div>
        </section>
      </article>
    </HotelPage>
  );
}
