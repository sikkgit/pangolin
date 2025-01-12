import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@server/db/schema";
import path from "path";
import fs from "fs/promises";
import { APP_PATH } from "@server/lib/consts";
import { existsSync, mkdirSync } from "fs";

export const location = path.join(APP_PATH, "db", "db.sqlite");
export const exists = await checkFileExists(location);

bootstrapVolume();

const sqlite = new Database(location);
export const db = drizzle(sqlite, { schema });

export default db;

async function checkFileExists(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

function bootstrapVolume() {
    const appPath = APP_PATH;

    const dbDir = path.join(appPath, "db");
    const logsDir = path.join(appPath, "logs");

    // check if the db directory exists and create it if it doesn't
    if (!existsSync(dbDir)) {
        mkdirSync(dbDir, { recursive: true });
    }

    // check if the logs directory exists and create it if it doesn't
    if (!existsSync(logsDir)) {
        mkdirSync(logsDir, { recursive: true });
    }

    // THIS IS FOR TRAEFIK; NOT REALLY NEEDED, BUT JUST IN CASE

    const traefikDir = path.join(appPath, "traefik");

    // check if the traefik directory exists and create it if it doesn't
    if (!existsSync(traefikDir)) {
        mkdirSync(traefikDir, { recursive: true });
    }
}
