module.exports.config = {
    name: "hentai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "VanHung",
    description: "Xem anh hentai",
    commandCategory: "nsfw",
    usages: "[args]\n❯ Ví dụ: .hentai futanari",
    cooldowns: 5
};
module.exports.onLoad = async function () {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, readFileSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const path = resolve(__dirname, 'cache', 'hentai.json');
    const url = "https://raw.githubusercontent.com/DaoKhanhDuy/miraiv2/main/modules/commands/cache/hentai.json";

    try {
        if (!existsSync(path)) await downloadFile(url, path);
        const data = JSON.parse(readFileSync(path));
        if (data.length == 0) await downloadFile(url, path);
        return;
    } catch { await downloadFile(url, path) };
};

module.exports.run = ({ event, api, args }) => {
    const { readFileSync, createReadStream, createWriteStream, unlinkSync } = require("fs-extra");
    const request = require("request");

    let hentaiData = JSON.parse(readFileSync(__dirname + "/cache/hentai.json"));
    if (!hentaiData.hasOwnProperty(args[0])) {
        let list = [];
        Object.keys(hentaiData).forEach(endpoint => list.push(endpoint));
        return api.sendMessage(`==== Tag Hentai ====\n${list.join(", ")}`, event.threadID, event.messageID);
    }
    else return request(hentaiData[args[0]], (error, response, body) => {
        let picData = JSON.parse(body);
        let URL = "";
        (!picData.data) ? URL = picData.url : URL = picData.data.response.url;
        let ext = URL.substring(URL.lastIndexOf(".") + 1);
        request(URL)
        .pipe(createWriteStream(__dirname + `/cache/hentai.${ext}`))
        .on("close", () => api.sendMessage({ attachment: createReadStream(__dirname + `/cache/hentai.${ext}`) }, event.threadID, () => unlinkSync(__dirname + `/cache/hentai.${ext}`), event.messageID));
    })
}