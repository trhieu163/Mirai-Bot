module.exports.config = {
    name: " ",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Duy Cute UwU",
    description: "nothing",
    commandCategory: "Admin",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
       let dny = ["Bạn đã biết.","Hiếu là một admin dễ thương.","Ngực là chân lý.","Gái gú chỉ là phù du, Rin mới là bất diệt.","Hiếu là một admin cute.","Bạn đang thở.","Đây là Bot của Rin.","Rin không dùng sim để chém gió","Trái đất hình vuông.","Chủ bot simp Rin.","Chim cánh cụt có thể bay."];
       api.sendMessage('[Bạn có biết?]: ' + dny[Math.floor(Math.random()*dny.length)],event.threadID,event.messageID);
}