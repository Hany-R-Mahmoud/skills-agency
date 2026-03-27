const MUTE_STORAGE_KEY = "agency-muted";
const bufferCache = new Map<string, AudioBuffer>();

let audioContext: AudioContext | null = null;
let ambientSource: AudioBufferSourceNode | null = null;
let ambientGainNode: GainNode | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!audioContext) {
    audioContext = new window.AudioContext();
  }

  return audioContext;
}

export function initAudio(): void {
  const context = getContext();

  if (context && context.state === "suspended" && !isMuted()) {
    void context.resume();
  }
}

export async function playUI(
  sound: "click" | "transition" | "activate" | "keystroke",
): Promise<void> {
  await playBuffer(
    [`/audio/ui/${sound}.wav`, `/audio/ui/${sound}.m4a`, `/audio/ui/${sound}.mp3`],
    sound === "keystroke" ? 0.3 : 1,
  );
}

export async function playAgentVoice(agentId: string): Promise<void> {
  await playBuffer(
    [
      `/audio/agents/${agentId}.wav`,
      `/audio/agents/${agentId}.m4a`,
      `/audio/agents/${agentId}.mp3`,
    ],
    1,
  );
}

export function startAmbient(): void {
  if (isMuted() || ambientSource) {
    return;
  }

  void (async () => {
    const context = getContext();

    if (!context) {
      return;
    }

    const buffer = await loadFirstAvailableBuffer([
      "/audio/ui/ambient-hq.wav",
      "/audio/ui/ambient-hq.m4a",
      "/audio/ui/ambient-hq.mp3",
    ]);

    if (!buffer || ambientSource) {
      return;
    }

    const source = context.createBufferSource();
    const gainNode = context.createGain();

    source.buffer = buffer;
    source.loop = true;
    gainNode.gain.value = 0.15;

    source.connect(gainNode);
    gainNode.connect(context.destination);
    source.start(0);

    ambientSource = source;
    ambientGainNode = gainNode;

    source.onended = () => {
      if (ambientSource === source) {
        ambientSource = null;
        ambientGainNode = null;
      }
    };
  })();
}

export function stopAmbient(fadeDuration = 1000): void {
  const context = audioContext;

  if (!context || !ambientSource || !ambientGainNode) {
    return;
  }

  const source = ambientSource;
  const gainNode = ambientGainNode;
  const currentTime = context.currentTime;
  const durationInSeconds = fadeDuration / 1000;

  gainNode.gain.cancelScheduledValues(currentTime);
  gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
  gainNode.gain.linearRampToValueAtTime(0, currentTime + durationInSeconds);

  window.setTimeout(() => {
    try {
      source.stop();
    } catch {
      // Ignore duplicate stop calls.
    }

    if (ambientSource === source) {
      ambientSource = null;
      ambientGainNode = null;
    }
  }, fadeDuration + 40);
}

export function setMuted(muted: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(MUTE_STORAGE_KEY, String(muted));

  if (!audioContext) {
    return;
  }

  if (muted) {
    stopAmbient(0);
    void audioContext.suspend();
    return;
  }

  void audioContext.resume();
}

export function isMuted(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(MUTE_STORAGE_KEY) === "true";
}

async function playBuffer(paths: string[], volume: number): Promise<void> {
  if (isMuted()) {
    return;
  }

  const context = getContext();

  if (!context) {
    return;
  }

  if (context.state === "suspended") {
    await context.resume();
  }

  for (const path of paths) {
    const buffer = await loadBuffer(path);

    if (!buffer) {
      continue;
    }

    const source = context.createBufferSource();
    const gainNode = context.createGain();

    source.buffer = buffer;
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(context.destination);
    source.start(0);
    return;
  }
}

async function loadFirstAvailableBuffer(
  paths: string[],
): Promise<AudioBuffer | null> {
  for (const path of paths) {
    const buffer = await loadBuffer(path);

    if (buffer) {
      return buffer;
    }
  }

  return null;
}

async function loadBuffer(path: string): Promise<AudioBuffer | null> {
  if (bufferCache.has(path)) {
    return bufferCache.get(path) ?? null;
  }

  const context = getContext();

  if (!context) {
    return null;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Audio asset not found: ${path}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);

    bufferCache.set(path, audioBuffer);
    return audioBuffer;
  } catch {
    return null;
  }
}
