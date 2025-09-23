import { isEnabled } from "../utils/toggle.js"
import fs from "fs"
import path from "path"

export default function statusDownloader(sock) {
  if (!isEnabled("statusdownloader")) return

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (msg.key.remoteJid !== "status@broadcast") return

    const mediaType = Object.keys(msg.message)[0]
    const buffer = await sock.downloadMediaMessage(msg)

    if (!buffer) return

    const ext = mediaType === "imageMessage" ? "jpg" : mediaType === "videoMessage" ? "mp4" : "bin"
    const filename = status-${Date.now()}.${ext}
    const savePath = path.join("downloads", filename)

    fs.mkdirSync("downloads", { recursive: true })
    fs.writeFileSync(savePath, buffer)
    console.log(`📥 Saved status to ${savePath}`)
  })
}