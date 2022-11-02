module.exports.config = {
    name: "choigai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "DungUwU",
    description: "Chơi gái với 1 ai đó",
    commandCategory: "nsfw",
    usages: "[tag]",
    cooldowns: 5
};

module.exports.onLoad = () => {
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    const dirMaterial = __dirname + `/cache/canvas/`;
    if (!fs.existsSync(dirMaterial + "canvas")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "choigai.png")) request("https://i.imgur.com/A7T04KJ.jpg").pipe(fs.createWriteStream(dirMaterial + "choigai.png"));
}

async function makeImage({ one, two }) {    
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    let choigai_image = await jimp.read(__root + "/choigai.png");
    let pathImg = __root + `/choigai_${one}_${two}.png`;
    let avatarOne = __root + `/avt_${one}.png`;
    let avatarTwo = __root + `/avt_${two}.png`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    choigai_image.composite(circleOne.resize(160, 160), 56, 164).composite(circleTwo.resize(150, 150), 380, 190);
    
    
    let raw = await choigai_image.getBufferAsync("image/png");
    
    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);
    
    return pathImg;
}
async function circle(image) {
    const jimp = global.nodemodule["jimp"];
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args, client }) {
    const { threadID, messageID, senderID } = event;
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'nsfw.json');
    const { nsfw } = require(path);

    if (nsfw.hasOwnProperty(threadID) && nsfw[threadID] == true) {
      const fs = global.nodemodule["fs-extra"];
    var mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
    else {
        var one = senderID, two = mention;
        return makeImage({ one, two }).then(path => api.sendMessage({ body: "Đã quá anh ui :3", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
    } else api.sendMessage('Nhóm của bạn chưa bật nsfw, dùng lệnh nsfw để xem chi tiết', threadID, messageID);
}