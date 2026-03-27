import Foundation
import AVFoundation

guard CommandLine.arguments.count >= 6 else {
    fputs("Usage: render-agent-audio.swift <out-path> <voice-id> <rate> <pitch> <text>\n", stderr)
    exit(1)
}

let outputPath = CommandLine.arguments[1]
let voiceID = CommandLine.arguments[2]
let rate = Float(CommandLine.arguments[3]) ?? 0.45
let pitch = Float(CommandLine.arguments[4]) ?? 1.0
let text = CommandLine.arguments[5]

let outputURL = URL(fileURLWithPath: outputPath)
try? FileManager.default.removeItem(at: outputURL)

let settings: [String: Any] = [
    AVFormatIDKey: kAudioFormatLinearPCM,
    AVSampleRateKey: 22050,
    AVNumberOfChannelsKey: 1,
    AVLinearPCMBitDepthKey: 16,
    AVLinearPCMIsFloatKey: false,
    AVLinearPCMIsBigEndianKey: false,
]

let file = try AVAudioFile(forWriting: outputURL, settings: settings)
let semaphore = DispatchSemaphore(value: 0)

let utterance = AVSpeechUtterance(string: text)
utterance.voice = AVSpeechSynthesisVoice(identifier: voiceID)
utterance.rate = rate
utterance.pitchMultiplier = pitch
utterance.volume = 1.0
utterance.prefersAssistiveTechnologySettings = false
utterance.preUtteranceDelay = 0.02
utterance.postUtteranceDelay = 0.04

let synthesizer = AVSpeechSynthesizer()
synthesizer.write(utterance) { buffer in
    guard let pcmBuffer = buffer as? AVAudioPCMBuffer else {
        return
    }

    if pcmBuffer.frameLength == 0 {
        semaphore.signal()
        return
    }

    try? file.write(from: pcmBuffer)
}

let status = semaphore.wait(timeout: .now() + 15)

if status == .timedOut {
    fputs("Timed out while rendering speech.\n", stderr)
    exit(2)
}
