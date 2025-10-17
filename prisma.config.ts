import "dotenv/config"
import path from "path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("src", "infra", "db", "prisma", "schema.prisma"),
  
});
