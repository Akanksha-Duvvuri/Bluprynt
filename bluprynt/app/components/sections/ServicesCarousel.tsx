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
  const doubled = [...services, ...services];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.innerWidth >= 720) return;

    let startX = 0;
    let isDragging = false;
    let pausedAt = 0; // translateX value when drag started

    const getCurrentX = () => {
      const style = window.getComputedStyle(track);
      const matrix = new DOMMatrix(style.transform);
      return matrix.m41; // current translateX in px
    };

    const onStart = (clientX: number) => {
      isDragging = true;
      startX = clientX;
      pausedAt = getCurrentX();
      track.style.animationPlayState = "paused";
      // Lock the position by switching to a static transform
      track.style.transform = `translateX(${pausedAt}px)`;
      track.style.animationName = "none"; // fully detach animation
    };

    const onMove = (clientX: number) => {
      if (!isDragging) return;
      const delta = clientX - startX;
      let next = pausedAt + delta;

      // Get the width of one set (half the track since it's doubled)
      const halfWidth = track.scrollWidth / 2;

      // Wrap within bounds so it feels infinite
      if (next > 0) next -= halfWidth;
      if (next < -halfWidth) next += halfWidth;

      track.style.transform = `translateX(${next}px)`;
    };

    const onEnd = (clientX: number) => {
      if (!isDragging) return;
      isDragging = false;

      const delta = clientX - startX;
      const finalX = pausedAt + delta;
      const halfWidth = track.scrollWidth / 2;

      // Normalize into valid range
      let normalized = finalX % halfWidth;
      if (normalized > 0) normalized -= halfWidth;

      // Re-attach animation from this position using a dynamic keyframe hack:
      // Set animation-delay to a negative value that corresponds to current position
      const duration = 18000; // ms — match your CSS animation duration
      const progress = Math.abs(normalized) / halfWidth; // 0–1
      const delay = -(progress * duration);

      track.style.transform = "";
      track.style.animationName = "";
      track.style.animationDelay = `${delay}ms`;
      track.style.animationPlayState = "running";
    };

    // Touch
    const onTouchStart = (e: TouchEvent) => onStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => onEnd(e.changedTouches[0].clientX);

    // Mouse (for desktop testing)
    const onMouseDown = (e: MouseEvent) => onStart(e.clientX);
    const onMouseMove = (e: MouseEvent) => { if (isDragging) onMove(e.clientX); };
    const onMouseUp = (e: MouseEvent) => onEnd(e.clientX);

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("mousedown", onMouseDown);

    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <>
      <div className={styles.carouselWrapper}>
        <ul className={styles.carouselTrack} ref={trackRef}>
          {doubled.map((s, i) => (
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
      </div>
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