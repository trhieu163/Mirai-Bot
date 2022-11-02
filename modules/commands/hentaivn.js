module.exports.config = {
    name: "hentaivn",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Tìm kiếm thông tin truyện trên hentaivn",
    commandCategory: "nsfw",
    usages: "[ID truyện]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "cheerio": ""
    }
};

module.exports.run = function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'nsfw.json');
    const { nsfw } = require(path);

    if (nsfw.hasOwnProperty(threadID) && nsfw[threadID] == true) {
        const cheerio = global.nodemodule["cheerio"];
    const axios = global.nodemodule["axios"];
    if (!args[0] || typeof parseInt(args[0]) !== "number") return api.sendMessage(`Code lý tưởng dành cho người anh em là:${Math.floor(Math.random() * 21553)}`, threadID, messageID);
    return axios.get(`https://hentaivn.moe/id${args[0]}`).then((response) => {
        if (response.status == 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            var getContainer = $('div.container');
            var getURL = getContainer.find('form').attr('action');
            if (getURL == `https://hentaivn.moe/${args[0]}-doc-truyen-.html`) return api.sendMessage(`Không tìm thấy truyện thông qua id bạn nhập :(`, threadID, messageID);
            axios.get(getURL).then((response) => {
                if (response.status == 200) {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    var getInfo = $('div class.container, div class.main, div class.page-info');
                    var getName = getInfo.find('h1').find('a').text();
                    var getTags = getInfo.find('a.tag').contents().map(function () {
                        return (this.type === 'text') ? $(this).text() + '' : '';
                    }).get().join(', ');
                    var getArtist = getInfo.find('a[href^="/tacgia="]').contents().map(function () {
                        return (this.type === 'text') ? $(this).text() + '' : '';
                    }).get().join(', ');
                    var getChar = getInfo.find('a[href^="/char="]').contents().map(function () {
                        return (this.type === 'text') ? $(this).text() + '' : '';
                    }).get().join(', ');
                    if (getChar == '') getChar = 'Original';
                    return api.sendMessage(`» Tên: ${getName.substring(1)}\n» Tác giả: ${getArtist}\n» Nhân vật: ${getChar}\n» Tags: ${getTags}\n» Liên kết: ${getURL.slice(0, 17) + " " + getURL.slice(17)}`, threadID, messageID);
                }
            }, (error) => console.log(error));
        }
    }, (error) => console.log(error));
      } else api.sendMessage('Nhóm của bạn chưa bật nsfw, dùng lệnh nsfw để xem chi tiết', threadID, messageID);
}