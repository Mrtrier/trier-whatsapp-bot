import { isEnabled } from "../utils/toggle.js"

export default function codegen(sock) {
  if (!isEnabled("codegen")) return

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    const from = msg.key.remoteJid
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""

    if (text.toLowerCase() === "code") {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      await sock.sendMessage(from, {
        text: `🔐 Your generated code is: *${code}*`,
      })
    }
  })
}