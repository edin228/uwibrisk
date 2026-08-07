import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import BreadcrumbSchema from "../components/schema/BreadcrumbSchema";
import OrganizationSchema from "../components/schema/OrganizationSchema";
import PersonSchema from "../components/schema/PersonSchema";
import { getPage } from "../services";
import companyInfo from "../utils/companyInfo";
import styles from "../styles/TrustedAdvisor.module.css";

const DANA_PHOTO =
  "https://us-west-2.graphassets.com/AxLg70bPjR3y8qyVdg6FNz/cmfx7hsh31lb507n5gluvg1ka";

const NAV_ITEMS = [
  ["What I’ve Learned", "learned"],
  ["Our Shared Responsibility", "responsibility"],
  ["Why Audit Risk Matters", "audit-risk"],
  ["About InsureTax", "insuretax"],
  ["Ambassador Program", "ambassador"],
];

const AUDIT_IMPACTS = [
  ["Representation costs", "Preparing, documenting, and responding to IRS requests"],
  ["Professional fees", "Time from CPAs, attorneys, and specialist advisors"],
  ["Business interruption", "Records, interviews, and operational distraction"],
  ["Client expectations", "Clarity about what support is—and is not—included"],
  ["Appeals", "Additional work when the first determination is challenged"],
  ["Litigation", "The potential cost of taking a dispute further"],
];

const RESPONSIBILITIES = [
  "We help people understand what could happen.",
  "We help them evaluate their choices.",
  "We help them prepare before circumstances decide.",
];

const AMBASSADOR_STEPS = [
  ["You", "Introduce the conversation", "Help a client understand why audit risk is worth considering."],
  ["UWIB Risk + InsureTax", "Handle the insurance process", "We explain, arrange, and support the coverage conversation."],
  ["You", "Keep serving as the advisor", "Your role—and the client relationship—stay exactly where they belong."],
];

const RESOURCES = [
  ["Reflections & essays", "“Over the Years I’ve Noticed Something…” and related articles"],
  ["Conversations", "Short videos, webinars, and thoughtful client stories"],
  ["Practical resources", "Guides, frequently asked questions, and advisor tools"],
];

function Brand({ priority = false }) {
  return (
    <span className={styles.brand}>
      <Image
        src="/UWIB-Wide-White.png"
        alt="UWIB Risk & Insurance Solutions"
        layout="fill"
        objectFit="contain"
        objectPosition="left center"
        priority={priority}
      />
    </span>
  );
}

function Eyebrow({ children }) {
  return <div className={styles.eyebrow}>{children}</div>;
}

function ConversationLink({ compact = false }) {
  return (
    <a
      className={`${styles.darkButton} ${compact ? styles.darkButtonCompact : ""}`}
      href="#conversation"
    >
      <span>Start a conversation</span>
      <span className={styles.buttonArrow} aria-hidden="true">
        ↓
      </span>
    </a>
  );
}

function SiteHeader() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <Link href="/">
          <a className={styles.headerBrand} aria-label="UWIB Risk home">
            <Brand priority />
          </a>
        </Link>

        <nav className={styles.desktopNav} aria-label="Trusted Advisor sections">
          {NAV_ITEMS.map(([label, id]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>

        <a className={styles.headerCta} href="#conversation">
          Start a conversation <span aria-hidden="true">→</span>
        </a>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open page navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile Trusted Advisor sections">
            {NAV_ITEMS.map(([label, id]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
            <a href="#conversation">Start a conversation</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

function ConversationForm({ formId }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    if (values.website) return;
    if (!formId) {
      setError("The form is temporarily unavailable. Please email helpdesk@uwib.com.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify({
          id: formId,
          Name: values.name,
          Firm: values.firm,
          Email: values.email,
          Phone: values.phone,
          "Professional designation": values.designation,
          Message: values.message,
          Source: "Trusted Advisor page",
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setStatus("success");
    } catch (submissionError) {
      setStatus("error");
      setError("Something went wrong. Please try again or email helpdesk@uwib.com.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.honeypot}
        name="website"
        type="text"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />

      <div className={styles.formPair}>
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Firm</span>
          <input name="firm" type="text" autoComplete="organization" required />
        </label>
      </div>

      <div className={styles.formPair}>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>
            Phone <em>(optional)</em>
          </span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>

      <label>
        <span>Professional designation</span>
        <select name="designation" defaultValue="" required>
          <option value="" disabled>
            Select your designation
          </option>
          <option>CPA</option>
          <option>Enrolled Agent</option>
          <option>CFP</option>
          <option>Insurance Advisor</option>
          <option>Attorney</option>
          <option>Other</option>
        </select>
      </label>

      <label>
        <span>Message</span>
        <textarea name="message" rows="4" required />
      </label>

      <div className={styles.formFooter}>
        <button type="submit" disabled={status === "submitting"}>
          <span>{status === "submitting" ? "Sending…" : "Send message"}</span>
          <span aria-hidden="true">→</span>
        </button>
        <p>
          Your information will only be used to respond to this inquiry.
        </p>
      </div>

      <div className={styles.formStatus} role="status" aria-live="polite">
        {status === "success" ? (
          <p>
            Thank you for reaching out. We appreciate your interest and look forward to
            continuing the conversation.
          </p>
        ) : null}
        {error ? <p className={styles.formError}>{error}</p> : null}
      </div>
    </form>
  );
}

export default function TrustedAdvisor({ formId }) {
  return (
    <>
      <Head>
        <title>Trusted Advisor | UWIB Risk &amp; Insurance Solutions</title>
        <meta
          name="description"
          content="Thoughts on trust, risk, and serving clients well. Learn how the InsureTax Ambassador Program helps trusted advisors educate clients about IRS audit risk and available protection."
        />
        <link rel="canonical" href={`${companyInfo.url}/trusted-advisor`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 96px;
        }

        @media (max-width: 900px) {
          html {
            scroll-padding-top: 80px;
          }
        }

        @media (max-width: 767px) {
          html {
            scroll-padding-top: 66px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>

      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: companyInfo.url },
          { name: "Trusted Advisor", url: `${companyInfo.url}/trusted-advisor` },
        ]}
      />
      <PersonSchema
        data={{
          name: "Dana Coates",
          position: "Director of Strategic Partnerships",
          slug: "team/dana-coates",
          photo: { url: DANA_PHOTO },
        }}
      />

      <div className={styles.page}>
        <a className={styles.skipLink} href="#main-content">
          Skip to content
        </a>
        <SiteHeader />

        <main id="main-content">
          <section className={styles.hero}>
            <div className={styles.heroInner}>
              <div className={styles.heroLead}>
                <div className={styles.heroCopy}>
                  <div className={styles.heroLabel}>
                    <span aria-hidden="true" /> Trusted Advisor
                  </div>
                  <h1>Over the years I’ve noticed something…</h1>
                  <p>Reflections on what it means to be a trusted advisor.</p>
                </div>
                <div className={styles.heroAction}>
                  <ConversationLink compact />
                  <span>A note from Dana Coates</span>
                </div>
              </div>

              <aside className={styles.heroQuote}>
                <span className={styles.quoteMark} aria-hidden="true">
                  “
                </span>
                <p>Clients rarely regret the risks they understood.</p>
                <p>They regret the ones they never saw coming—or weren’t prepared for.</p>
              </aside>
            </div>
          </section>

          <section className={styles.learned} id="learned">
            <div className={styles.sectionTitle}>
              <span>01</span>
              <h2>What I’ve learned</h2>
            </div>
            <div className={styles.articleCopy}>
              <p className={styles.articleLead}>
                Over the years I’ve noticed something, and I’d be curious whether you’ve
                noticed it too.
              </p>
              <p>
                Clients rarely regret the risks they understood. They regret the ones they
                never saw coming or weren’t prepared for.
              </p>
              <p>
                As trusted advisors, none of us can predict the future. We cannot prevent
                every audit, lawsuit, cyberattack, wildfire, or unexpected event.
              </p>
              <p>
                What we can do is help our clients understand those risks before they become
                realities.
              </p>
              <blockquote>
                I believe that is one of the highest responsibilities we accept when someone
                places their trust in us.
              </blockquote>
            </div>
          </section>

          <section className={styles.responsibility} id="responsibility">
            <div className={styles.responsibilityHeading}>
              <div>
                <span>02</span>
                <h2>Our shared responsibility</h2>
              </div>
              <p>The risks are different. Our responsibility is remarkably similar.</p>
            </div>

            <div className={styles.advisorComparison}>
              <article>
                <h3>For the tax advisor</h3>
                <p>
                  The risk may be an IRS audit—or having to explain why defending a client’s
                  return resulted in professional fees the client never anticipated.
                </p>
              </article>
              <article>
                <h3>For the insurance advisor</h3>
                <p>
                  The risk may be a wildfire, liability lawsuit, cyberattack, or another
                  financial event that changes everything in a matter of hours.
                </p>
              </article>
            </div>

            <div className={styles.responsibilityList}>
              {RESPONSIBILITIES.map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.awareness}>
            <Eyebrow>03 · We create awareness, not fear</Eyebrow>
            <h2>
              The purpose of a trusted advisor is not to alarm people. It is to help them
              make informed decisions.
            </h2>
            <p>The most valuable advice is often the advice our clients hope they never need.</p>
            <span className={styles.awarenessRule} aria-hidden="true" />
            <blockquote>
              I have yet to meet a client who was upset because someone took the time to
              explain an important risk. I have met many who wished someone had.
            </blockquote>
          </section>

          <section className={styles.auditRisk} id="audit-risk">
            <div className={styles.auditIntro}>
              <Eyebrow>04 · Why audit risk matters</Eyebrow>
              <h2>The cost of an audit is rarely just the tax.</h2>
              <p>
                When a return is questioned, a client may face representation costs,
                unexpected professional fees, business disruption, appeals, or
                litigation—often while trying to understand what their advisor can and
                cannot do.
              </p>
              <p className={styles.auditConclusion}>
                These conversations are most useful before an audit occurs, when clients
                still have time to understand their choices.
              </p>
            </div>

            <div className={styles.auditList}>
              {AUDIT_IMPACTS.map(([title, description], index) => (
                <div key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.insureTax} id="insuretax">
            <div className={styles.insureTaxHeading}>
              <Eyebrow>05 · A practical option</Eyebrow>
              <div>
                <div className={styles.insureTaxWordmark}>
                  Insure<span>Tax</span>
                </div>
                <h2>A way to prepare for the financial side of an audit.</h2>
              </div>
            </div>
            <div className={styles.insureTaxCopy}>
              <p>
                InsureTax is one practical solution designed to help clients manage the
                professional expenses that can follow an IRS audit.
              </p>
              <p>
                It does not prevent an audit, predict an outcome, or replace sound tax
                advice. It gives clients a way to plan for costs they might otherwise face
                unexpectedly.
              </p>
              <div className={styles.insureTaxNotes}>
                <div>
                  <span>The idea</span>
                  <p>Plan before an audit.</p>
                </div>
                <div>
                  <span>The purpose</span>
                  <p>Reduce financial surprise.</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.ambassador} id="ambassador">
            <div className={styles.ambassadorHeading}>
              <div>
                <Eyebrow>06 · The InsureTax Ambassador Program</Eyebrow>
                <h2>A responsible way to begin an important conversation.</h2>
              </div>
              <p>
                The advisor is not becoming an insurance salesperson. The advisor remains
                exactly what they already are: a trusted advisor.
              </p>
            </div>

            <div className={styles.ambassadorSteps}>
              {AMBASSADOR_STEPS.map(([label, title, description], index) => (
                <div className={index === 1 ? styles.featuredStep : ""} key={title}>
                  <span>{label}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.danaMessage}>
            <div className={styles.danaPortraitColumn}>
              <div className={styles.danaPortrait}>
                <Image
                  src={DANA_PHOTO}
                  alt="Dana Coates"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center top"
                  sizes="(max-width: 767px) 342px, 420px"
                />
              </div>
              <div className={styles.danaIdentity}>
                <strong>Dana Coates</strong>
                <span>Director of Strategic Partnerships</span>
                <span>UWIB Risk &amp; Insurance Solutions</span>
              </div>
            </div>

            <div className={styles.danaCopy}>
              <Eyebrow>A personal note</Eyebrow>
              <h2>Why this matters to me</h2>
              <p>
                After nearly fifty years in underwriting, agency operations, software
                development, and risk management, one lesson stands above all others.
              </p>
              <div className={styles.danaLesson}>
                <span>People rarely regret preparing.</span>
                <span>They often regret not knowing.</span>
              </div>
              <p className={styles.danaSmallCopy}>
                If an IRS audit never comes, wonderful. If it does, I hope no client ever has
                to say,
              </p>
              <blockquote>“I wish someone had told me about this.”</blockquote>
            </div>
          </section>

          <section className={styles.conversationCta}>
            <div>
              <Eyebrow>If this reflects how you serve</Eyebrow>
              <h2>Start a conversation</h2>
              <p>
                If these thoughts reflect the way you serve your clients, I’d enjoy the
                opportunity to talk with you about the InsureTax Ambassador Program.
              </p>
              <div className={styles.noPressure}>
                <span>No pressure.</span>
                <b>·</b>
                <span>No sales presentation.</span>
                <b>·</b>
                <span>Just a conversation.</span>
              </div>
            </div>
            <ConversationLink />
          </section>

          <section className={styles.conversation} id="conversation">
            <div className={styles.conversationIntro}>
              <div>
                <Eyebrow>Let’s talk</Eyebrow>
                <h2>Let’s start a conversation</h2>
                <p>
                  Tell us a little about yourself and what brought you here. Dana or a member
                  of the UWIB team will follow up personally.
                </p>
              </div>
              <span>Your information will only be used to respond to this inquiry.</span>
            </div>
            <ConversationForm formId={formId} />
          </section>

          <section className={styles.library}>
            <div className={styles.libraryHeading}>
              <div>
                <Eyebrow>A growing resource</Eyebrow>
                <h2>The Trusted Advisor Library</h2>
              </div>
              <p>
                This page is designed to grow into a home for the ideas, tools, and
                conversations that help advisors serve clients well.
              </p>
            </div>
            <div className={styles.resourceList}>
              {RESOURCES.map(([title, description], index) => (
                <div key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <em>Coming soon</em>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerMain}>
            <div>
              <Brand />
              <p>Insurance solutions how you want them, when you need them.</p>
            </div>
            <nav aria-label="Footer navigation">
              <div>
                <strong>Trusted Advisor</strong>
                <a href="#learned">What I’ve learned</a>
                <a href="#audit-risk">Why audit risk matters</a>
                <a href="#ambassador">Ambassador Program</a>
              </div>
              <div>
                <strong>UWIB Risk</strong>
                <Link href="/team"><a>About</a></Link>
                <Link href="/blog"><a>Insights</a></Link>
                <Link href="/contact"><a>Contact</a></Link>
              </div>
            </nav>
          </div>
          <div className={styles.footerLegal}>
            <span>© 2026 UWIB Risk &amp; Insurance Solutions</span>
            <div>
              <Link href="/privacy-policy"><a>Privacy</a></Link>
              <Link href="/terms-of-use"><a>Terms</a></Link>
              <Link href="/licenses"><a>State licenses</a></Link>
              <Link href="/compensation-disclosure"><a>Compensation disclosure</a></Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const contactPage = await getPage("contact");
    return {
      props: {
        formId: contactPage?.forms?.[0]?.id || null,
      },
    };
  } catch (error) {
    return { props: { formId: null } };
  }
}
