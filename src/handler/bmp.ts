import { AttachmentBuilder } from "discord.js";
import Jimp from "jimp";
import type { AttachmentHandler } from "../handle";

export const bmp: AttachmentHandler = async (attachment) => {
	const image = await Jimp.read(attachment.url);
	const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
	const name = attachment.name.replace(/\.[^.]+$/, ".png");
	return new AttachmentBuilder(buffer, { name });
};
