import { Attachment, AttachmentBuilder, Message } from "discord.js";
import { config } from "./config";
import { avif } from "./handler/avif";
import { bmp } from "./handler/bmp";
import { html } from "./handler/html";
import { mp3 } from "./handler/mp3";
import { ogg } from "./handler/ogg";
import { pdf } from "./handler/pdf";
import { svg } from "./handler/svg";
import { tiff } from "./handler/tiff";
import { wav } from "./handler/wav";
import { log } from "./log";

export type AttachmentHandler = (
	attachment: Attachment,
) => Promise<string | AttachmentBuilder | undefined>;

const handlers: Record<string, AttachmentHandler | undefined> = {
	"image/bmp": bmp,
	"image/svg+xml": svg,
	"image/avif": avif,
	"image/tiff": tiff,
	"text/html": html,
	"application/pdf": pdf,
	"application/postscript": pdf,
	"audio/mpeg": mp3,
	"audio/ogg": ogg,
	"audio/wav": wav,
	"audio/x-wav": wav,
};

const KB = 1024;
const MB = KB * 1024;

export async function handle(message: Message) {
	if (message.author.bot) {
		return;
	}

	if (!message.guild || !message.attachments.size) {
		return;
	}

	if (!message.channel.isTextBased()) {
		return;
	}

	if (message.channel.isDMBased()) {
		return;
	}

	log(
		"Getting attachments",
		message.attachments
			.map((attachment) => [attachment.name, attachment.contentType])
			.join(", "),
	);

	await message.channel.sendTyping();

	const responses = await Promise.all(
		message.attachments.map(async (attachment) => {
			const handler = handlers[attachment.contentType?.split(";")[0] || ""];
			if (handler && attachment.size > config.FILE_SIZE_LIMIT) {
				return `File size limit exceeded: \`${attachment.name}\` (${(attachment.size / MB).toFixed(2)} MB > ${(config.FILE_SIZE_LIMIT / MB).toFixed(2)} MB)`;
			}
			return handler?.(attachment).catch(error);
		}),
	);

	const texts = responses.filter((text): text is string => typeof text === "string");
	const files = responses.filter(
		(file): file is AttachmentBuilder => file instanceof AttachmentBuilder,
	);

	if (!texts.length && !files.length) {
		return;
	}

	if (config.CREATE_THREAD && !message.channel.isThread()) {
		const thread = await message.startThread({ name: "ConvEase" }).catch(() => message.channel);
		if (!thread.isDMBased()) {
			await thread.send({
				content: texts.join("\n"),
				files,
			});
		}
	} else {
		await message.reply({
			content: texts.join("\n"),
			files,
		});
	}
}

function error(error: unknown): string {
	if (error instanceof Error) {
		return error.message.slice(0, 2000);
	}
	return "An error occurred";
}
