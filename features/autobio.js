import { isEnabled } from "../utils/toggle.js"
import moment from "moment"

export default function autoBio(sock) {
  if (!isEnabled("autobio")) return

  setInterval(async () => {
    const bio = `🤖 Bot active since ${moment().format("DD MMM YYYY, HH:mm")}`
    try {
      await sock.updateProfileStatus(bio)
      console.log("📝 Bio updated:", bio)
    } catch (e) {
      console.error("❌ Failed to update bio:", e)
    }
  }, 3600000) // every 1 hour
}