/**
 * Copied from Spell UI.
 * https://spell.sh/docs/signature
 *
 * Licensed under the MIT License.
 */

"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { parse as parseFont } from "opentype.js";

type SignatureGlyph = {
  advanceWidth?: number;
  getPath: (
    x: number,
    y: number,
    fontSize: number,
  ) => {
    toPathData: (decimalPlaces?: number) => string;
  };
};

type SignatureFont = {
  unitsPerEm: number;
  charToGlyph: (char: string) => SignatureGlyph;
};

const SVG_HEIGHT = 100;
const PATH_DELAY_STEP = 0.2;
const OPACITY_DELAY_OFFSET = 0.01;
// Module-level font cache avoids re-fetching/parsing the same .otf on every render.
const fontCache = new Map<string, SignatureFont>();

// Normalize the path to an absolute URL so different string forms share one cache entry.
function getFontCacheKey(path: string): string {
  try {
    return new URL(path, window.location.origin).href;
  } catch {
    return path;
  }
}

// Per-path transition: each glyph starts after the previous one (staggered draw-on effect).
function getPathTransition(index: number, duration: number, delay: number) {
  const pathDelay = delay + index * PATH_DELAY_STEP;

  return {
    pathLength: {
      delay: pathDelay,
      duration,
      ease: "easeInOut" as const,
    },
    opacity: {
      // Slight offset so a path becomes visible just before it starts drawing.
      delay: pathDelay + OPACITY_DELAY_OFFSET,
      duration: 0.01,
    },
  };
}

// Try each path in order; return and cache the first font that loads successfully.
async function loadFontFromPaths(fontPaths: string[]): Promise<SignatureFont> {
  for (const path of fontPaths) {
    try {
      const cacheKey = getFontCacheKey(path);
      const cachedFont = fontCache.get(cacheKey);

      if (cachedFont) {
        return cachedFont;
      }

      const response = await fetch(path);

      if (!response.ok) {
        continue;
      }

      const fontBuffer = await response.arrayBuffer();
      const font = parseFont(fontBuffer) as SignatureFont;
      fontCache.set(cacheKey, font);

      return font;
    } catch {
      // Try next path
    }
  }

  throw new Error(
    `Font could not be loaded from the provided path${fontPaths.length === 1 ? "" : "s"}: ${fontPaths.join(", ")}`,
  );
}

// Convert each character to an SVG path using opentype.js, advancing the pen by the
// glyph's advanceWidth scaled to the requested font size.
async function buildSignaturePaths({
  text,
  fontSize,
  baseline,
  horizontalPadding,
}: {
  text: string;
  fontSize: number;
  baseline: number;
  horizontalPadding: number;
}): Promise<{ paths: string[]; width: number }> {
  const font = await loadFontFromPaths(["/LastoriaBoldRegular.otf"]);

  let x = horizontalPadding;
  const nextPaths: string[] = [];

  for (const char of text) {
    const glyph = font.charToGlyph(char);
    const path = glyph.getPath(x, baseline, fontSize);
    nextPaths.push(path.toPathData(3));

    // Advance the pen; fall back to unitsPerEm if the glyph has no advance width.
    const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
    x += advanceWidth * (fontSize / font.unitsPerEm);
  }

  return {
    paths: nextPaths,
    width: x + horizontalPadding,
  };
}

function renderMotionPaths({
  paths,
  stroke,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  duration,
  delay,
}: {
  paths: string[];
  stroke: string;
  strokeWidth: number;
  strokeLinecap: "round" | "butt";
  strokeLinejoin: "round";
  duration: number;
  delay: number;
}) {
  return paths.map((d, index) => (
    <motion.path
      key={index}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      variants={PATH_VARIANTS}
      transition={getPathTransition(index, duration, delay)}
      vectorEffect="non-scaling-stroke"
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
    />
  ));
}

// Motion variants: paths animate from zero length (hidden) to fully drawn (visible).
const PATH_VARIANTS = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

interface SignatureProps {
  text?: string;
  color?: string;
  fontSize?: number;
  duration?: number;
  delay?: number;
  className?: string;
  inView?: boolean;
  once?: boolean;
}

export function Signature({
  text = "Signature",
  color = "#000",
  fontSize = 14,
  duration = 1.5,
  delay = 0,
  className,
  inView = false,
  once = true,
}: SignatureProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(300);
  const horizontalPadding = fontSize * 0.1;
  // Vertically center the text within the fixed SVG height.
  const topMargin = Math.max(5, (SVG_HEIGHT - fontSize) / 2);
  const baseline = Math.min(SVG_HEIGHT - 5, topMargin + fontSize);
  // useId may contain ":" which is invalid in CSS selectors; strip them for the mask id.
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    // Guard prevents setting state after the effect is cleaned up (unmount/dep change).
    let isCancelled = false;

    async function loadSignaturePaths() {
      try {
        const { paths: nextPaths, width: nextWidth } = await buildSignaturePaths({
          text,
          fontSize,
          baseline,
          horizontalPadding,
        });

        if (isCancelled) {
          return;
        }

        setPaths(nextPaths);
        setWidth(nextWidth);
      } catch {
        if (isCancelled) {
          return;
        }

        // Fallback: estimate width if the font fails to load so layout doesn't collapse.
        setPaths([]);
        setWidth(text.length * fontSize * 0.6);
      }
    }

    void loadSignaturePaths();

    return () => {
      isCancelled = true;
    };
  }, [text, fontSize, baseline, horizontalPadding]);

  return (
    <motion.svg
      // Remount when the number of paths changes so the draw animation restarts cleanly.
      key={paths.length}
      width={width}
      height={SVG_HEIGHT}
      viewBox={`0 0 ${width} ${SVG_HEIGHT}`}
      fill="none"
      className={className}
      initial="hidden"
      // Animate on view (once) when `inView`, otherwise animate immediately on mount.
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once }}
    >
      <defs>
        {/* White stroke paths form a mask that "reveals" the colored fill as it draws. */}
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {renderMotionPaths({
            paths,
            stroke: "white",
            strokeWidth: fontSize * 0.22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            duration,
            delay,
          })}
        </mask>
      </defs>

      {renderMotionPaths({
        paths,
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: "butt",
        strokeLinejoin: "round",
        duration,
        delay,
      })}

      <g mask={`url(#${maskId})`}>
        {paths.map((d, index) => (
          <path key={index} d={d} fill={color} />
        ))}
      </g>
    </motion.svg>
  );
}