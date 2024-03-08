import { AttachmentBuilder } from "discord.js";
import type { AttachmentHandler } from "../handle";
import { browser } from "../helper/browser";

export const html: AttachmentHandler = async (attachment) => {
	const source = await fetch(attachment.url).then((response) => response.text());
	const name = attachment.name.replace(/\.[^.]+$/, ".png");
	let buffer: Buffer;

	const bwr = await browser();
	const ctx = await bwr.newContext();
	try {
		const page = await ctx.newPage();
		try {
			await page.setContent(source);
			buffer = await page.screenshot({ fullPage: true, timeout: 15_000 });
		} finally {
			await page.close();
		}
	} finally {
		await ctx.close();
	}

	if (!buffer) {
		throw new Error("Failed to generate screenshot");
	}

	return new AttachmentBuilder(buffer, { name });
};
