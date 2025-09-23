import { isEnabled } from "../utils/toggle.js"
import axios from "axios"

export default function chatbot(sock) {
  if (!isEnabled("chatbot")) return

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    const from = msg.key.remoteJid
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""

    if (!text || text.length > 100 || !from.endsWith("@s.whatsapp.net")) return

    try {
      const res = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=en`)
      const reply = res.data.success || "🤖 Sorry, I didn’t get that."

      await sock.sendMessage(from, { text: reply })
    } catch (e) {
      console.error("❌ Chatbot error:", e)
    }
  })
}