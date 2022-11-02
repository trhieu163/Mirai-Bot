module.exports.config = {
    name: "tikinfo", // Tên lệnh, được sử dụng trong việc gọi lệnh
    version: "1.0.0", // phiên bản của module này
    hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
    credits: "DungUwU", // Công nhận module sở hữu là ai
    description: "Check info tik tok của user", // Thông tin chi tiết về lệnh
    commandCategory: "Tiện ích", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
    usages: "< username >", // Cách sử dụng lệnh
    cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
    dependencies: {
        "axios": "",
        "fs": ""
    }
};

module.exports.run = function ({ api, event, args }) {
    const { threadID } = event;
    if (!args[0]) return api.sendMessage("Bạn chưa nhập tên tài khoản của người dùng cần xem thông tin", threadID);
    const username = args[0];
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs"];
    try {
        axios.get(encodeURI(`https://TIKTOKAPI-ThanhAli.thanhali.repl.co/tikin4.php?username=@${username}`)).then(async (res) => {
            if (res.data.erro == 1) return api.sendMessage("Tên tài khoản không tồn tại", threadID);
            const { id, name, url, avatar, verified, privateAccount, followerCount, followingCount, videoCount, heartCount, description } = res.data;
            await axios.get(encodeURI(avatar), { responseType: 'arraybuffer' }).then((ress) => {
                const buffer = Buffer.from(ress.data, 'utf8');
                const tempDir = __dirname + "/cache/tikinfo" + id + ".png";
                fs.writeFileSync(tempDir, buffer);
                let msg = `
                  ==== 𝐈𝐍𝐅𝐎 𝐓𝐈𝐊𝐓𝐎𝐊 ====\n
                    📱 𝗧𝗲̂𝗻 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻: ${args[0]}
                    🎫 𝗜𝗗: ${id}
                    🎟️ 𝗧𝗲̂𝗻 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴: ${name}
                    🔗 𝗨𝗥𝗟: ${url}
                    💬 𝗠𝗼̂ 𝘁𝗮̉: ${description}
                    ✅ 𝗧𝗶́𝗰𝗵 𝘅𝗮𝗻𝗵: ${verified ? "Bật" : "Tắt"}
                    🔰 𝗧𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻 𝗿𝗶𝗲̂𝗻𝗴 𝘁𝘂̛: ${privateAccount ? "Bật" : "Tắt"}
                    👁️‍🗨️ 𝗟𝘂̛𝗼̛̣𝘁 𝘁𝗵𝗲𝗼 𝗱𝗼̃𝗶: ${followerCount}
                    👥 𝗛𝗶𝗲̣̂𝗻 𝘁𝗵𝗲𝗼 𝗱𝗼̃𝗶: ${followingCount}
                    🎞 𝗧𝗼̂̉𝗻𝗴 𝘃𝗶𝗱𝗲𝗼: ${videoCount}
                    ❤️ 𝗟𝘂̛𝗼̛̣𝘁 𝘁𝗶𝗺: ${heartCount}
                `.replace(/^ +/gm, '')
                return api.sendMessage({
                    body: msg,
                    attachment: fs.createReadStream(tempDir),
                }, threadID, () => fs.unlinkSync(tempDir));
            })
        })
    } catch (error) { console.log(error) }
                                            }