import styles from "../../styles/Hotels.module.css";

export default function RiskBriefCover({ compact = false }) {
  return (
    <div className={`${styles.briefCover} ${compact ? styles.briefCoverCompact : ""}`}>
      <div className={styles.briefCoverTop}>
        <span className={styles.briefMonogram} aria-hidden="true">H</span>
        <span className={styles.briefIssue}>
          ISSUE 01
          <br />
          SEPT 2026
        </span>
      </div>
      <div className={styles.briefCoverTitle}>
        California
        <br />
        Hospitality
        <br />
        Risk Brief
      </div>
      <p>Practical risk management insights.</p>
      <div className={styles.briefCoverFocus}>
        <span>This month’s focus</span>
        <strong>Preventing housekeeping injuries: a silent cost driver.</strong>
      </div>
    </div>
  );
}
