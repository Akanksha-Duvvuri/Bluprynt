"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSheetObserver } from "@/lib/cad/useSheetObserver";
import { useSpotlight } from "@/lib/cad/useSpotlight";
import { useTypewriter } from "@/lib/cad/useTypewriter";
import styles from "./Hero.module.css";

const CMD =
  "Cmd: _SELECT — move cursor to inspect · scroll to assemble drawing";

export default function Hero() {
  const sheetRef = useSheetObserver<HTMLElement>("A-001");
  const spotlightRef = useSpotlight<HTMLElement>();
  const [mounted, setMounted] = useState(false);
  const cmd = useTypewriter(CMD, { delay: 800, charMs: 22 });

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

      <div className={styles.stamp}>
        <span className={styles.stampCode}>A-001 / 06</span>
        <span className={styles.stampSep}>·</span>
        <span className={styles.stampLabel}>SITE</span>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaRow}>
          <span className={styles.metaK}>Active</span>
          <span className={styles.metaV}>07</span>
        </span>
        <span className={styles.metaRow}>
          <span className={styles.metaK}>Markets</span>
          <span className={styles.metaV}>US · IN</span>
        </span>
        <span className={styles.metaRow}>
          <span className={styles.metaK}>Disc.</span>
          <span className={styles.metaV}>PRE-CON</span>
        </span>
      </div>

      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} /> Your Trusted Preconstruction Partner
        </p>

        <h1 className={styles.headline}>
          <span className={styles.h1Line}>Engineering Accuracy.</span>
          <span className={styles.h1Line}>
            <span className={styles.h1Gold}>Consulting Excellence.</span> 
          </span>
          <span className={styles.h1Period}>.</span>
        </h1>

        <p className={styles.sub}>
          Bluprynt delivers preconstruction services to US general contractors, 
concrete subcontractors, and rebar fabricators. Our delivery team is 
based in India; our standards are American. We operate on your time 
zone, talk to your field teams, and hit your bid deadlines
        </p>

        <div className={styles.ctas}>
          <Link href="/contact" className={styles.ctaPrimary}>
            Start a project
            <span className={styles.ctaArrow}>→</span>
          </Link>
          <Link href="/work" className={styles.ctaGhost}>
            Browse our work
          </Link>
        </div>

        <div className={styles.dimRow}>
          <span className={styles.dim}>
            <span className={styles.dimTick} /> 0
          </span>
          <span className={styles.dimLine} />
          <span className={styles.dim}>
            32&apos;-0&quot; · OVERALL
            <span className={styles.dimTick} />
          </span>
        </div>
      </div>

      <div className={styles.cmdBar}>
        <span className={styles.cmdPrompt}>›</span>
        <span className={styles.cmdText}>
          {cmd.text}
          <span className={`${styles.caret} ${cmd.done ? styles.blink : ""}`}>
            ▌
          </span>
        </span>
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
