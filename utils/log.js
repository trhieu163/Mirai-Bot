const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[Lỗi] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[Lỗi] » ') + data);
			break;
		default:
			console.log(chalk.magenta(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[Rin Cute] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[Rin Cute] » ') + data);
			break;
		default:
			console.log(chalk.green(`[Rin Cute] » `) + data);
			break;
	}
}