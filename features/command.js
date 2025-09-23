import { isEnabled, toggleFeature } from "../utils/toggle.js"

export default function commands(sock) {
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return
    const from = msg.key.remoteJid
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""

    if (!text.startsWith("/")) return

    const command = text.trim().toLowerCase()

    if (command === "/menu") {
      await sock.sendMessage(from, {
        text: `📜 *Bot Menu*\n\nAvailable commands:\n/menu\n/help\n/toggle <feature>\n\nTry /toggle antidelete`,
      })
    }

    else if (command === "/help") {
      await sock.sendMessage(from, {
        text: `🆘 *Help*\nSend /menu to see available commands.\nUse /toggle <feature> to enable/disable modules.`,
      })
    }

    else if (command.startsWith("/toggle ")) {
      const feature = command.split(" ")[1]
      const result = toggleFeature(feature)
      await sock.sendMessage(from, {
        text: result ? `✅ ${feature} enabled : ❌ ${feature} disabled`,
      })
    }
  })
}