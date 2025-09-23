import { isEnabled } from "../utils/toggle.js"

export default function dmReply(sock) {
  if (!isEnabled("dmreply")) return

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    const from = msg.key.remoteJid

    // Only reply to direct chats (not groups or broadcasts)
    if (!from.endsWith("@s.whatsapp.net")) return

    await sock.sendMessage(from, {
      text: "👋 Hello! This is TRIER AI. How can I assist you today?",
    })
  })
}