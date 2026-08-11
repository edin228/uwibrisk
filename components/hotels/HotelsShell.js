import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../../styles/Hotels.module.css";
import { HOTEL_PATHS } from "./content";

const NAV_ITEMS = [
  ["Why UWIB", HOTEL_PATHS.why],
  ["Coverage", HOTEL_PATHS.coverage],
  ["Hotel Risk Brief", HOTEL_PATHS.briefs],
  ["About", `${HOTEL_PATHS.home}#team`],
];

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

function HotelHeader() {
  const router = useRouter();
  const activePath = router.pathname;

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href={HOTEL_PATHS.home}>
          <a className={styles.brandLockup} aria-label="UWIB boutique hotel insurance home">
            <Logo priority />
            <span className={styles.brandDivider} />
            <span className={styles.brandDescriptor}>
              Boutique hotel
              <br />
              insurance
            </span>
          </a>
        </Link>

        <nav className={styles.desktopNav} aria-label="Boutique hotel insurance">
          {NAV_ITEMS.map(([label, href]) => {
            const isActive =
              href === HOTEL_PATHS.briefs
                ? activePath.startsWith("/hotels/risk-briefs")
                : activePath === href;
            return (
              <Link href={href} key={href}>
                <a className={isActive ? styles.navActive : undefined}>{label}</a>
              </Link>
            );
          })}
          <Link href={`${HOTEL_PATHS.home}#contact`}>
            <a className={styles.headerCta}>Request a review</a>
          </Link>
        </nav>

        <details className={styles.mobileMenu}>
          <summary aria-label="Open boutique hotel navigation">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile boutique hotel insurance">
            {NAV_ITEMS.map(([label, href]) => (
              <Link href={href} key={href}>
                <a>{label}</a>
              </Link>
            ))}
            <Link href={`${HOTEL_PATHS.home}#contact`}>
              <a>Request a review</a>
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function HotelFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <Link href={HOTEL_PATHS.home}>
            <a aria-label="UWIB boutique hotel insurance home">
              <Logo />
            </a>
          </Link>
          <p>Independent insurance guidance for California boutique hotels.</p>
        </div>
        <div className={styles.footerNav}>
          <div>
            <Link href={HOTEL_PATHS.why}><a>Why UWIB</a></Link>
            <Link href={HOTEL_PATHS.coverage}><a>Coverage</a></Link>
            <Link href={HOTEL_PATHS.briefs}><a>Risk Brief</a></Link>
          </div>
          <div>
            <Link href={`${HOTEL_PATHS.home}#team`}><a>About</a></Link>
            <Link href={`${HOTEL_PATHS.home}#contact`}><a>Contact</a></Link>
            <Link href="/privacy-policy"><a>Privacy</a></Link>
          </div>
          <Link href={`${HOTEL_PATHS.home}#contact`}>
            <a className={styles.footerCta}>Request a review →</a>
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

export function HotelPage({ children }) {
  return (
    <div className={styles.site}>
      <HotelHeader />
      <main>{children}</main>
      <HotelFooter />
    </div>
  );
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
