import { isEnabled } from "../utils/toggle.js"

export default function antiCall(sock) {
  if (!isEnabled("anticall")) return

  sock.ev.on("call", async ({ from }) => {
    try {
      await sock.updateBlockStatus(from, "block")
      console.log(`📵 Blocked caller: ${from}`)
    } catch (e) {
      console.error("❌ Failed to block caller:", e)
    }
  })
}