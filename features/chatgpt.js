import { isEnabled } from "../utils/toggle.js"
import axios from "axios"

const OPENAI_API_KEY = "your-openai-key-here" // Replace with your actual key

export default function chatGPT(sock) {
  if (!isEnabled("chatgpt")) return

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    const from = msg.key.remoteJid
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""

    if (!text || text.length > 200 || !from.endsWith("@s.whatsapp.net")) return

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )

      const reply = res.data.choices[0].message.content
      await sock.sendMessage(from, { text: reply })
    } catch (e) {
      console.error("❌ ChatGPT error:", e)
    }
  })
}