require("./module.js")

const spinner = { 
"interval": 500,
"frames": [
"🅘",
"🅡",
"🅕",
"🅐",
"🅝",
"🅑", 
"🅐", 
"🅢",
"🅔"
]}

let globalSpinner;

const getGlobalSpinner = (disableSpins = false) => {
if (!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins});
return globalSpinner;
}

spins = getGlobalSpinner(false)

const start = (id, text) => {
spins.add(id, {text: text})
}

const info = (id, text) => {
spins.update(id, {text: text})
}

const success = (id, text) => {
spins.succeed(id, {text: text})
}

const close = (id, text) => {
spins.fail(id, {text: text})
}

const reSize = (buffer, ukur1, ukur2) => {
    return new Promise(async(resolve, reject) => {
        var baper = await Jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
        resolve(ab)
    })
}

const createSerial = (size) => {
        return CRpto.randomBytes(size).toString('hex').slice(0, size)
        }

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

const runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " Hari, " : " Hari, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " Jam, " : " Jam, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " Menit, " : " Menit, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " Detik" : " Detik") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

const fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

const toRupiah = (angka) => {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

global.start = start
global.info = info
global.success = success
global.close = close
global.reSize = reSize
global.createSerial = createSerial
global.getBuffer = getBuffer
global.runtime = runtime
global.getRandom = getRandom
global.fetchJson = fetchJson
global.toRupiah = toRupiah

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})