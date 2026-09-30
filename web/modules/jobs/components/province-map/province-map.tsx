"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import { jobsHref } from "@/modules/jobs/utils/jobs-href";
import { Loader } from "@/shared/components/loader/loader";

import styles from "./province-map.module.css";

// The package measures its SVG with getBBox() after mounting, so it can only
// render in the browser. The placeholder keeps the space while it loads.
const Argentina = dynamic(() => import("@react-map/argentina"), {
  ssr: false,
  loading: () => (
    <div className={styles["province-map__placeholder"]}>
      <Loader label="Cargando mapa" />
    </div>
  ),
});

// The map names every province like the CMS except the capital.
const toCmsName = (mapName: string) => (mapName === "Ciudad de Buenos Aires" ? "CABA" : mapName);
const toMapName = (cmsName: string) => (cmsName === "CABA" ? "Ciudad de Buenos Aires" : cmsName);

// Paths are rendered with id `${province}-${instanceId}`.
const provinceFromPathId = (id: string) => toCmsName(id.slice(0, id.lastIndexOf("-")));

const offersLabel = (count: number) =>
  count === 0 ? "Sin ofertas por ahora" : `${count} ${count === 1 ? "oferta" : "ofertas"}`;

type Hovered = { province: string; count: number };

// Mouse-only enhancement: the province list next to it links to the same
// pages for keyboard and screen reader users, so the map is aria-hidden.
export function ProvinceMap({ counts }: { counts: Record<string, number> }) {
  const router = useRouter();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Hovered | null>(null);

  // The package writes these straight into inline styles, so CSS custom
  // properties work and keep the colors on the design tokens.
  const provinceColors = useMemo(() => {
    const max = Math.max(1, ...Object.values(counts));
    return Object.fromEntries(
      Object.entries(counts).map(([province, count]) => [
        toMapName(province),
        `color-mix(in oklab, var(--color-accent) ${Math.round(20 + (80 * count) / max)}%, var(--color-paper))`,
      ]),
    );
  }, [counts]);

  const handleSelect = (mapName: string | null) => {
    if (!mapName) return;
    router.push(jobsHref({ province: toCmsName(mapName) }), { transitionTypes: ["nav-forward"] });
  };

  const handlePointerOver = (event: React.PointerEvent) => {
    const target = event.target as Element;
    if (target.tagName !== "path") return;
    const province = provinceFromPathId(target.id);
    setHovered({ province, count: counts[province] ?? 0 });
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    tooltipRef.current?.style.setProperty("translate", `${event.clientX}px ${event.clientY}px`);
  };

  return (
    <div
      className={styles["province-map"]}
      aria-hidden
      onPointerOver={handlePointerOver}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovered(null)}
    >
      <Argentina
        type="select-single"
        mapColor="var(--province-map-empty)"
        cityColors={provinceColors}
        strokeColor="var(--color-paper)"
        strokeWidth={0.8}
        hoverColor="var(--color-ink)"
        selectColor="var(--color-ink)"
        onSelect={handleSelect}
      />
      <div
        ref={tooltipRef}
        className={styles["province-map__tooltip"]}
        data-visible={hovered !== null}
      >
        {hovered && (
          <>
            <strong>{hovered.province}</strong>
            <span>{offersLabel(hovered.count)}</span>
          </>
        )}
      </div>
    </div>
  );
}
