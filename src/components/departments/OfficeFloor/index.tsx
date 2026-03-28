"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { initAudio, playUI } from "@/lib/audio";
import type { RoomTile } from "@/lib/types";
import styles from "./OfficeFloor.module.scss";

interface OfficeFloorProps {
  tiles: RoomTile[];
  activeSlug?: string;
}

const roomPositions: Record<string, { left: string; top: string }> = {
  command: { left: "50%", top: "49%" },
  engineering: { left: "20%", top: "26%" },
  design: { left: "80%", top: "24%" },
  quality: { left: "28%", top: "76%" },
  security: { left: "72%", top: "76%" },
  knowledge: { left: "50%", top: "10%" },
};

export default function OfficeFloor({ tiles, activeSlug }: OfficeFloorProps) {
  async function handleHover(): Promise<void> {
    void initAudio();
    void playUI("keystroke");
  }

  return (
    <section className={styles.floor}>
      <div className={styles.header}>
        <div>
          <p className="label-sm">Single-floor office</p>
          <h2>Glass-wall navigation with live department signals.</h2>
        </div>
        <p className={styles.copy}>
          Each room inherits its label, counts, and accent system from the shared
          skills dataset, with mobile collapsing into a vertical deck below.
        </p>
      </div>

      <div className={styles.mapWrap}>
        <div className={styles.mapFrame}>
          <Image
            src="/images/office/office-floor-map-alt.png"
            alt="Agency office floor map"
            fill
            priority
            sizes="(max-width: 960px) 100vw, 75vw"
            className={styles.mapImage}
          />

          {tiles.map((tile) => {
            const position = roomPositions[tile.slug];

            return (
              <motion.div
                key={tile.slug}
                className={styles.room}
                data-department={tile.id}
                data-active={activeSlug === tile.slug}
                style={position}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                onMouseEnter={() => void handleHover()}
              >
                <Link href={tile.href} className={styles.roomLink}>
                  <span className={styles.roomLabel}>{tile.label}</span>
                  <span className={styles.roomMeta}>
                    {tile.onlineCount} online · {tile.agentCount} total
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className={styles.mobileDeck}>
        {tiles.map((tile) => (
          <Link
            key={tile.slug}
            href={tile.href}
            className={styles.mobileCard}
            data-department={tile.id}
            data-active={activeSlug === tile.slug}
          >
            <div className={styles.mobileImageWrap}>
              <Image
                src={tile.imagePath}
                alt={`${tile.label} room preview`}
                fill
                sizes="(max-width: 960px) 100vw, 33vw"
                className={styles.mobileImage}
              />
            </div>
            <div className={styles.mobileCopy}>
              <span className="label-sm">{tile.label}</span>
              <strong>{tile.tagline}</strong>
              <span>{tile.onlineCount} online · {tile.busyCount} busy</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
