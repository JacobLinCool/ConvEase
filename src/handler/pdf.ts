import { AttachmentBuilder } from "discord.js";
import type { AttachmentHandler } from "../handle";
import { browser } from "../helper/browser";

export const pdf: AttachmentHandler = async (attachment) => {
	const source = await fetch(attachment.url).then((response) => response.arrayBuffer());
	const name = attachment.name.replace(/\.[^.]+$/, ".png");
	let buffer: Buffer;

	const bwr = await browser();
	const ctx = await bwr.newContext();
	try {
		const page = await ctx.newPage();
		try {
			await page.goto("https://jacoblincool.github.io/ai-viewer/");
			const input = page.locator("input[type=file]");
			await input.setInputFiles({
				name: attachment.name,
				mimeType: "application/pdf",
				buffer: Buffer.from(source),
			});
			await page.waitForSelector(".page-1", { timeout: 15_000, state: "attached" });
			await page.waitForTimeout(1000);
			const canvas = page.locator("canvas");
			buffer = await canvas.screenshot({ timeout: 15_000 });
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
