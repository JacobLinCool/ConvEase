import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const model = google("gemini-2.0-flash-001");

export async function transcribe(
	audio: ArrayBuffer,
	mimeType: "audio/wav" | "audio/mpeg" | "audio/ogg",
	prompt = process.env.TRANSCRIPTION_PROMPT,
) {
	const { text } = await generateText({
		model,
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text:
							prompt ||
							'Transcribe this audio to text, with punctuation, capitalization, and hesitations like "um" and "uh" included.',
					},
					{
						type: "file",
						data: audio,
						mimeType,
					},
				],
			},
		],
	});

	return text;
}
