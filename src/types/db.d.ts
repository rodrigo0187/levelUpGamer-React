declare module "../db.js" {
  import type { Pool } from "mysql2/promise";

  export const db: Pool;
}
