import { bot } from "./bot";
import { config } from "./config";

bot.login(config.BOT_TOKEN);

const SIGNALS = ["SIGINT", "SIGTERM", "SIGUSR2"];
for (const signal of SIGNALS) {
	process.once(signal, async () => {
		await bot.destroy();
		console.log(`Signal ${signal} received. Shutting down...`);
		process.exit(0);
	});
}
