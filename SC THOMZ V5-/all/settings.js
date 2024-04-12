require("./module")

global.owner = "628388072690"
global.creAtor = "628388072690@s.whatsapp.net"
global.namabot = "THOMZ PANEL"
global.thomvelz = "FkOc4as2UaXA4pjfS5q6ax" //g usah di ubah biar g eror
global.packname = ""
global.author = "Sticker By THOMZ PANEL"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})