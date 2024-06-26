require("./all/global")

const func = require("./all/place")

async function startSesi() {

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()

console.log(color(figlet.textSync("THOMVELZ", {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
width: 80,
whitespaceBreak: false
}), 'cyan'))

const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['SC FREE THOMZ','Safari','1.0.0'],
auth: state,
version
}

const thomz = func.makeWASocket(connectionOptions)

store.bind(thomz.ev)

global.autoJoin = true

thomz.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
thomz.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
thomz.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `Tersambung`)
thomz.sendMessage(thomzgtg+"@s.whatsapp.net", { text: "BOT UDAH NYALA YAH ASU\n\nKALO MAU BELI PANEL DI THOMZ", contextInfo:{ forwardingScore: 9999, isForwarded: true }})
if (autoJoin) {
thomz.groupAcceptInvite(thomvelz)
}
}
})

thomz.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return
if (!thomz.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(thomz, m, store)
require("./thomz")(thomz, m, store)
} catch (err) {
console.log(err)
}
})

thomz.ev.on('creds.update', saveCreds)
return thomz
}

startSesi()

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})