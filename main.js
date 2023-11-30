// scatter me to the four winds

const {
	BaseModule,
	FxpWorkerController,
	Fxp,
	FxpApiWrapper,
	Gmailnator,
	GmailnatorRefresher,
	GmailnatorMessages,
	GmailnatorClient,
	SmailPro,
	FxpClient,
	BaseClient,
	FxpCookieJar,
	AgentPool,
	FxpHttpsProxyAgent,
	FxpHttpProxyAgent,
	FxpImageUploader,
	FxpForum
} = require('./necromancer');

const SchizoBot = require('./schizo');

const { Semaphore, Mutex, tryAcquire } = require('async-mutex');

const { options } = require('./options');
const { existsSync, readFileSync, writeFileSync } = require('fs');
const crypto = require('crypto');
const modules = require('./modules');

const sleep = ms => new Promise(r => setTimeout(r, ms));

const between = (min, max) => {
	return Math.floor(
	    Math.random() * (max - min + 1) + min
	)
};

const obfuscateName = (name, level = 3) => {
	const set = ((level) => {
		let word = '';
		const regular = ['\uFEFF', '\u200B', '\u2060'];
		for (let i = 0; i < level; ++i) {
		   word += regular[~~(Math.random() * regular.length)];
		}
		return word;
	})(level);

	for (let i = 0; i < level; ++i) {
		const char = set[i];
		const idx = ~~Math.floor(Math.random() * name.length);
		name = name.substr(0, idx) + char + name.substr(idx);
	}

	return name;
};

function fromBinary(encoded) {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

const main = async () => {
	const schizo = new SchizoBot();
  
	const mainModule = async (client) => {
		const { title, description } = {
			title: schizo.generate(),
			description: schizo.generate()
		}; 

		// changeImage - proxy off
		// loginUser - proxy off

		try {
			await client.createThread(18, obfuscateName('test1'), 'test2'));
		} catch (_) { }
	};

	const exec = new FxpWorkerController({
		concurrency: 100,
		emailClient: new Gmailnator(),
		mainModule: mainModule,
		accountFile: './accounts.txt'
	});

	await exec.start();

	  //const cl = new Fxp({ });
	  //const ploader = new FxpImageUploader(cl);
	  //console.log('uploading...');
	  //const result = await ploader.uploadFromFiles( './maggot' );

   process.exit(0);
}

main();
