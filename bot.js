import makeWASocket from "@whiskeysockets/baileys"
import { useMultiFileAuthState } from "@whiskeysockets/baileys"
import { Boom } from "@hapi/boom"

// Feature modules
import antidelete from "./features/antidelete.js"
import alwaysOnline from "./features/alwaysonline.js"
import fakeRecord from "./features/fakerecord.js"
import autoRead from "./features/autoread.js"
import codegen from "./features/codegen.js"
import dmReply from "./features/dmreply.js"
import autoLike from "./features/autolike.js"
import statusDownloader from "./features/statusdownloader.js"
import antiCall from "./features/anticall.js"
import autoBio from "./features/autobio.js"
import chatbot from "./features/chatbot.js"
import chatGPT from "./features/chatgpt.js"
import commands from "./features/commands.js"

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth")
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  })

  sock.ev.on("creds.update", saveCreds)
  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== 401
      if (shouldReconnect) {
        startBot()
      }
    }
  })

  // Load all features
  antidelete(sock)
  alwaysOnline(sock)
  fakeRecord(sock)
  autoRead(sock)
  codegen(sock)
  dmReply(sock)
  autoLike(sock)
  statusDownloader(sock)
  antiCall(sock)
  autoBio(sock)
  chatbot(sock)
  chatGPT(sock)
  commands(sock)
}

startBot()