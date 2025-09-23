import { isEnabled } from "../utils/toggle.js"

export default function antidelete(sock) {
  if (!isEnabled("antidelete")) return

  sock.ev.on("messages.delete", async ({ key }) => {
    const chat = key.remoteJid
    const sender = key.participant || chat
    await sock.sendMessage(chat, {
      text: `🚫 Message deleted by ${sender}, but I saved it 😎`,
    })
  })
}