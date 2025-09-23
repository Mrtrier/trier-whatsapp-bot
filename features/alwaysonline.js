import { isEnabled } from "../utils/toggle.js"

export default function alwaysOnline(sock) {
  if (!isEnabled("alwaysonline")) return

  setInterval(() => {
    sock.sendPresenceUpdate("available")
  }, 60000) // every 60 seconds
}