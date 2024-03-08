import { Client, Events, GatewayIntentBits } from "discord.js";
import { handle } from "./handle";
import { log } from "./log";

export const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

bot.once(Events.ClientReady, () => log("Bot is ready"));
bot.on(Events.MessageCreate, handle);
