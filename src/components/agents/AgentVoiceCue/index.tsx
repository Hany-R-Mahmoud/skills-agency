"use client";

import { useEffect, useRef } from "react";
import {
  initAudio,
  playAgentVoice,
} from "@/lib/audio";

interface AgentVoiceCueProps {
  agentId: string;
}

export default function AgentVoiceCue({ agentId }: AgentVoiceCueProps) {
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    async function playVoice(): Promise<void> {
      if (hasPlayedRef.current) {
        return;
      }

      hasPlayedRef.current = true;
      initAudio();
      await playAgentVoice(agentId);
    }

    function handleFirstInteraction(): void {
      void playVoice();
    }

    window.addEventListener("pointerdown", handleFirstInteraction, {
      once: true,
    });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [agentId]);

  return null;
}
