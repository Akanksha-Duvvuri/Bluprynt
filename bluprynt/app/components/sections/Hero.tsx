"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSheetObserver } from "@/lib/cad/useSheetObserver";
import { useSpotlight } from "@/lib/cad/useSpotlight";
import styles from "./Hero.module.css";


export default function Hero() {
  const sheetRef = useSheetObserver<HTMLElement>("A-001");
  const spotlightRef = useSpotlight<HTMLElement>();
  const [mounted, setMounted] = useState(false);

  // Combine refs so the section element gets both observers.
  const setRef = useCallback(
    (node: HTMLElement | null) => {
      sheetRef.current = node;
      spotlightRef.current = node;
    },
    [sheetRef, spotlightRef],
  );

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section
      ref={setRef}
      className={`${styles.hero} ${mounted ? styles.mounted : ""}`}
      data-sheet="A-001"
    >
      {/* The CAD spotlight is now provided globally by [data-sheet]
          rules in globals.css. No per-section grid layer needed. */}

      <CornerTicks />

      <div className={styles.inner}>
        <div className={styles.stamp}>
        <span className={styles.stampCode}>A-001</span>
        <span className={styles.stampSep}>·</span>
        <span className={styles.stampLabel}>OVERVIEW</span>
      </div>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} /> PRECONSTRUCTION · US GCs · CONCRETE · REBAR
        </p>

        <h1 className={styles.headline}>
          <span className={styles.h1Line}>Your Trusted Preconstruction Partner.</span>
          <span className={styles.h1Line}>
            <span className={styles.h1Gold}>Built for US Builders.</span> 
          </span>
          <span className={styles.h1Period}>.</span>
        </h1>

        <p className={styles.sub}>
         Bluprynt delivers preconstruction services to US general contractors, concrete subcontractors, and rebar fabrications. Our delivery team is in India; our standards are American - same time zone, same bid deadlines, 40-60% lower cost. 
        </p>

        <div className={styles.ctas}>
          <Link href="/#contact" className={styles.ctaPrimary}>
            Send us a bid package
            <span className={styles.ctaArrow}>→</span>
          </Link>
          <span className={styles.ctaGhost}> Get a free sample in 48 hours.</span>
        </div>

        <div className={styles.dimRow}>
          <span className={styles.dimLine} />
          <span className={styles.dim}>
            
            <span className={styles.dimTick} />
          </span>
        </div>
      </div>
    </section>
  );
}

function CornerTicks() {
  return (
    <>
      <svg className={`${styles.cornerTick} ${styles.tickTL}`} viewBox="0 0 40 40">
        <path
          d="M0 0 L40 0 M0 0 L0 40"
          stroke="#C4A564"
          strokeWidth="1"
          fill="none"
          strokeDasharray="80"
          strokeDashoffset="80"
        />
      </svg>
      <svg className={`${styles.cornerTick} ${styles.tickTR}`} viewBox="0 0 40 40">
        <path
          d="M40 0 L0 0 M40 0 L40 40"
          stroke="#C4A564"
          strokeWidth="1"
          fill="none"
          strokeDasharray="80"
          strokeDashoffset="80"
        />
      </svg>
      <svg className={`${styles.cornerTick} ${styles.tickBL}`} viewBox="0 0 40 40">
        <path
          d="M0 40 L40 40 M0 40 L0 0"
          stroke="#C4A564"
          strokeWidth="1"
          fill="none"
          strokeDasharray="80"
          strokeDashoffset="80"
        />
      </svg>
      <svg className={`${styles.cornerTick} ${styles.tickBR}`} viewBox="0 0 40 40">
        <path
          d="M40 40 L0 40 M40 40 L40 0"
          stroke="#C4A564"
          strokeWidth="1"
          fill="none"
          strokeDasharray="80"
          strokeDashoffset="80"
        />
      </svg>
    </>
  );
}
