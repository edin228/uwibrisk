import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../styles/Hotels.module.css";
import { HOTEL_PATHS } from "./content";

const HOTEL_BRAND = {
  home: HOTEL_PATHS.home,
  label: "UWIB boutique hotel insurance",
  descriptor: ["Boutique hotel", "insurance"],
  navLabel: "Boutique hotel insurance",
  nav: [
    { label: "Why UWIB", href: HOTEL_PATHS.why },
    { label: "Coverage", href: HOTEL_PATHS.coverage },
    {
      label: "Hotel Risk Brief",
      href: HOTEL_PATHS.briefs,
      isActive: (path) => path.startsWith("/hotels/risk-briefs"),
    },
    { label: "About", href: `${HOTEL_PATHS.home}#team` },
  ],
  cta: { label: "Request a review", href: `${HOTEL_PATHS.home}#contact` },
  tagline: "Independent insurance guidance for California boutique hotels.",
  footerColumns: [
    [
      ["Why UWIB", HOTEL_PATHS.why],
      ["Coverage", HOTEL_PATHS.coverage],
      ["Risk Brief", HOTEL_PATHS.briefs],
    ],
    [
      ["About", `${HOTEL_PATHS.home}#team`],
      ["Contact", `${HOTEL_PATHS.home}#contact`],
      ["Privacy", "/privacy-policy"],
    ],
  ],
};

function Logo({ priority = false }) {
  return (
    <span className={styles.logo}>
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

function LandingHeader({ brand }) {
  const router = useRouter();
  const activePath = router.pathname;

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href={brand.home}>
          <a className={styles.brandLockup} aria-label={`${brand.label} home`}>
            <Logo priority />
            <span className={styles.brandDivider} />
            <span className={styles.brandDescriptor}>
              {brand.descriptor[0]}
              <br />
              {brand.descriptor[1]}
            </span>
          </a>
        </Link>

        <nav className={styles.desktopNav} aria-label={brand.navLabel}>
          {brand.nav.map(({ label, href, isActive }) => {
            const active = isActive ? isActive(activePath) : activePath === href;
            return (
              <Link href={href} key={href}>
                <a className={active ? styles.navActive : undefined}>{label}</a>
              </Link>
            );
          })}
          <Link href={brand.cta.href}>
            <a className={styles.headerCta}>{brand.cta.label}</a>
          </Link>
        </nav>

        <details className={styles.mobileMenu}>
          <summary aria-label={`Open ${brand.navLabel.toLowerCase()} navigation`}>
            <span />
            <span />
          </summary>
          <nav aria-label={`Mobile ${brand.navLabel.toLowerCase()}`}>
            {brand.nav.map(({ label, href }) => (
              <Link href={href} key={href}>
                <a>{label}</a>
              </Link>
            ))}
            <Link href={brand.cta.href}>
              <a>{brand.cta.label}</a>
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function LandingFooter({ brand }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <Link href={brand.home}>
            <a aria-label={`${brand.label} home`}>
              <Logo />
            </a>
          </Link>
          <p>{brand.tagline}</p>
        </div>
        <div className={styles.footerNav}>
          {brand.footerColumns.map((column) => (
            <div key={column[0][1]}>
              {column.map(([label, href]) => (
                <Link href={href} key={href}><a>{label}</a></Link>
              ))}
            </div>
          ))}
          <Link href={brand.cta.href}>
            <a className={styles.footerCta}>{brand.cta.label} →</a>
          </Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2026 UWIB Risk &amp; Insurance Solutions</span>
        <span>
          <Link href="/licenses"><a>State licenses</a></Link>
          <span aria-hidden="true"> · </span>
          <Link href="/privacy-policy"><a>Privacy policy</a></Link>
        </span>
      </div>
    </footer>
  );
}

export function LandingPage({ brand, children }) {
  return (
    <div className={styles.site}>
      <LandingHeader brand={brand} />
      <main>{children}</main>
      <LandingFooter brand={brand} />
    </div>
  );
}

export function HotelPage({ children }) {
  return <LandingPage brand={HOTEL_BRAND}>{children}</LandingPage>;
}

export function Eyebrow({ children, light = false }) {
  return (
    <div className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ""}`}>
      {children}
    </div>
  );
}

export function ButtonLink({ children, href, light = false, outline = false }) {
  return (
    <Link href={href}>
      <a
        className={`${styles.button} ${light ? styles.buttonLight : ""} ${
          outline ? styles.buttonOutline : ""
        }`}
      >
        {children}
      </a>
    </Link>
  );
}
