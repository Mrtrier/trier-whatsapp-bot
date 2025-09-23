import { isEnabled } from "../utils/toggle.js"

export default function fakeRecord(sock) {
  if (!isEnabled("fakerecord")) return

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    const from = msg.key.remoteJid

    try {
      await sock.sendPresenceUpdate("composing", from)
      setTimeout(async () => {
        await sock.sendPresenceUpdate("recording", from)
      }, 1500)
    } catch (e) {
      console.error("❌ Failed to simulate recording:", e)
    }
  })
}