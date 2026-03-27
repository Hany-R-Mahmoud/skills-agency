"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Collapse, Divider, Drawer, Tag, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import AgentSprite from "@/components/shared/AgentSprite";
import StatusPip from "@/components/shared/StatusPip";
import { initAudio, playAgentVoice } from "@/lib/audio";
import type { AgentDetailView } from "@/lib/types";
import styles from "./AgentPanel.module.scss";

interface AgentPanelProps {
  agent: AgentDetailView | null;
  open: boolean;
  onClose: () => void;
}

export default function AgentPanel({ agent, open, onClose }: AgentPanelProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !agent) {
      return;
    }

    initAudio();
    void playAgentVoice(agent.id);
  }, [agent, open]);

  useEffect(() => {
    if (!copiedKey) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedKey(null);
    }, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copiedKey]);

  const collapseItems = useMemo(() => {
    if (!agent || agent.replaces.length === 0) {
      return [];
    }

    return [
      {
        key: "replaces",
        label: "CONSOLIDATED FROM",
        children: (
          <code className={styles.replacesCopy}>{agent.replaces.join(", ")}</code>
        ),
      },
    ];
  }, [agent]);

  async function copyValue(key: string, value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
    } catch {
      setCopiedKey(null);
    }
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      size={420}
      rootClassName={styles.drawerRoot}
      destroyOnHidden={false}
      title={null}
      closable={{ placement: "end" }}
    >
      {agent ? (
        <motion.div
          key={agent.id}
          className={styles.panel}
          data-accent={agent.accentColor}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <header className={styles.header}>
            <AgentSprite
              color={agent.sprite.color}
              variant={agent.sprite.variant as 1 | 2 | 3 | 4}
              style={agent.sprite.style}
              status={agent.status}
              size={48}
              label={`${agent.name} sprite`}
            />
            <div className={styles.headerCopy}>
              <h2>{agent.name}</h2>
              <Tag variant="filled" className={styles.deptBadge}>
                {agent.departmentName}
              </Tag>
            </div>
          </header>

          <Divider className={styles.divider} />

          <p className={styles.codename}>{agent.codename}</p>

          <div className={styles.statusRow}>
            <StatusPip status={agent.status} />
            <span className={styles.statusText}>
              {agent.status} — {agent.role}
            </span>
          </div>

          <p className={styles.description}>{agent.description}</p>

          <section className={styles.section}>
            <p className="label-sm">Skills</p>
            <div className={styles.skillGrid}>
              {(agent.skills ?? []).map((skill) => (
                <Tag key={skill} variant="filled" className={styles.skillTag}>
                  {skill}
                </Tag>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <p className="label-sm">Invoke</p>
            <div className={styles.invokeGrid}>
              <div className={styles.codeCard}>
                <div className={styles.codeHeader}>
                  <span className="label-sm">Codex</span>
                  <Tooltip title={copiedKey === "codex" ? "Copied!" : "Copy"}>
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() => void copyValue("codex", agent.invocation.codex)}
                    />
                  </Tooltip>
                </div>
                <pre>{agent.invocation.codex}</pre>
              </div>
              <div className={styles.codeCard}>
                <div className={styles.codeHeader}>
                  <span className="label-sm">OpenCode</span>
                  <Tooltip title={copiedKey === "opencode" ? "Copied!" : "Copy"}>
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() => void copyValue("opencode", agent.invocation.opencode)}
                    />
                  </Tooltip>
                </div>
                <pre>{agent.invocation.opencode}</pre>
              </div>
            </div>
          </section>

          {collapseItems.length > 0 ? (
            <Collapse
              bordered={false}
              ghost
              className={styles.replaces}
              items={collapseItems}
            />
          ) : null}
        </motion.div>
      ) : null}
    </Drawer>
  );
}
