import { z } from "zod";

export const ConfigSchema = z.object({
	BOT_ID: z.string().min(10),
	BOT_TOKEN: z.string().min(60),
	PW_SERVER_URL: z.string().url().optional(),
	CREATE_THREAD: z
		.enum(["true", "false", "1", "0", ""])
		.optional()
		.transform((v) => v === "true" || v === "1"),
	FILE_SIZE_LIMIT: z
		.string()
		.optional()
		.transform((v) => (v ? parseInt(v, 10) : 20 * 1024 * 1024)),
});
