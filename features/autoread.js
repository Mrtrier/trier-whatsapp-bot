import { isEnabled } from "../utils/toggle.js"

export default function autoRead(sock) {
  if (!isEnabled("autoread")) return

  sock.ev.on("messages.upsert", async ({ messages }) => {
    for (const msg of messages) {
      try {
        await sock.readMessages([msg.key])
      } catch (e) {
        console.error("❌ Failed to mark message as read:", e)
      }
    }
  })
}