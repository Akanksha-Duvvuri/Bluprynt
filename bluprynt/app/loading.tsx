import styles from "./loading.module.css";

/**
 * Shown automatically by Next.js while a route segment is loading
 * (e.g. while a server component awaits data).
 *
 * Sits inside the layout's content slot — navbar, statusbar, and crosshair
 * stay visible above/below this. Only the page area shows the loading state.
 */
export default function Loading() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.inner}>
        <img
          src="/Logo.png"
          alt=""
          className={styles.logo}
          aria-hidden="true"
        />
        <span className={styles.text}>
          PLOTTING
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </span>
        <span className={styles.sub}>SHEET RENDERING · DO NOT CLOSE</span>
      </div>
    </div>
  );
}