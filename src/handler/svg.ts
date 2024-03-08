import { AttachmentBuilder } from "discord.js";
import sharp from "sharp";
import type { AttachmentHandler } from "../handle";

export const svg: AttachmentHandler = async (attachment) => {
	const source = await fetch(attachment.url).then((response) => response.arrayBuffer());
	const buffer = await sharp(source).png().toBuffer();
	const name = attachment.name.replace(/\.[^.]+$/, ".png");
	return new AttachmentBuilder(buffer, { name });
};
