import dotenv from "dotenv";
import { ConfigSchema } from "./schema";

dotenv.config();

export const config = ConfigSchema.parse(process.env);

export default config;
