"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./ServicesPreview.module.css";

type Service = {
  slug: string;
  title: string;
  line: string;
};

export function ServicesCarousel({ services }: { services: Service[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const tripled = [...services, ...services, ...services];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId: number;
    let isTouching = false;
    let oneSetWidth = 0;
    const speed = 0.5;

    const init = () => {
      // Only run on mobile — checked here inside effect, not at top level
      if (window.innerWidth >= 720) return;

      oneSetWidth = track.scrollWidth / 3;
      if (oneSetWidth === 0) return; // layout not ready yet, retry

      track.scrollLeft = oneSetWidth;

      const tick = () => {
        if (!isTouching) {
          track.scrollLeft += speed;
          if (track.scrollLeft >= oneSetWidth * 2) track.scrollLeft -= oneSetWidth;
          if (track.scrollLeft <= 0) track.scrollLeft += oneSetWidth;
        }
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    const onTouchStart = () => { isTouching = true; };
    const onTouchEnd   = () => { isTouching = false; };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend",   onTouchEnd,   { passive: true });

    // Wait one frame for layout to paint so scrollWidth is real
    const frameId = requestAnimationFrame(init);

    return () => {
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(rafId);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <>
      <ul className={styles.carouselTrack} ref={trackRef}>
        {tripled.map((s, i) => (
          <li
            key={`${s.slug}-${i}`}
            className={styles.tile}
            style={{ ["--i" as string]: i % services.length }}
            aria-hidden={i >= services.length ? "true" : undefined}
          >
            <div className={styles.leader} aria-hidden="true">
              <span className={styles.leaderDot} />
              <span className={styles.leaderLine} />
            </div>
            <div className={styles.tileHead} />
            <h3 className={styles.tileTitle}>{s.title}</h3>
            <p className={styles.tileLine}>{s.line}</p>
            <div className={styles.tileFoot}>
              <span className={styles.tileTag}>SHEET A-002.{s.slug}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        ▸ Note: There is no minimum project pricing, we take on all scales of
        work. Rates are transparent with no hidden fees
      </p>
      <div className={styles.foot}>
        <Link href="/services" className={styles.viewAll}>
          <span>View all Services Provided</span>
          <span className={styles.viewArrow}>→</span>
        </Link>
      </div>
    </>
  );
}