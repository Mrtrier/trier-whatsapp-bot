import { isEnabled } from "../utils/toggle.js"

export default function autoLike(sock) {
  if (!isEnabled("autolike")) return

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (msg.key.remoteJid === "status@broadcast") {
      try {
        await sock.sendMessage("status@broadcast", {
          react: { text: "🔥", key: msg.key },
        })
        console.log("⚡ Auto-reacted to a status with 🔥")
      } catch (e) {
        console.error("❌ Failed to auto-react:", e)
      }
    }
  })
}