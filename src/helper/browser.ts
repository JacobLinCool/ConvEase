import type { Browser } from "playwright-core";
import { chromium } from "playwright-core";
import { config } from "../config";

const _browser = config.PW_SERVER_URL ? chromium.connect(config.PW_SERVER_URL) : null;

export async function browser(): Promise<Browser> {
	if (!_browser) {
		throw new Error("PW_SERVER_URL is not set, cannot connect to Playwright Server");
	}
	return _browser;
}
