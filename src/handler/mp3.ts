import { AttachmentBuilder } from "discord.js";
import type { AttachmentHandler } from "../handle";
import { transcribe } from "../helper/ai";

export const mp3: AttachmentHandler = async (attachment) => {
	const source = await fetch(attachment.url).then((response) => response.arrayBuffer());
	const output = await transcribe(source, "audio/mpeg");
	const name = attachment.name.replace(/\.[^.]+$/, ".txt");
	if (output.length > 1000) {
		return new AttachmentBuilder(Buffer.from(output), { name });
	}
	return output;
};
