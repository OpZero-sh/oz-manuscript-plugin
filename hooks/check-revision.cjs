// Claude Code invokes this hook only before a revision-sensitive chapter write.
const fs = require("node:fs");

try {
  const event = JSON.parse(fs.readFileSync(0, "utf8"));
  const revision = event.tool_input?.if_revision;
  if (typeof revision !== "string" || revision.trim() === "") {
    console.error("Read the chapter and pass its current revision as if_revision before editing it.");
    process.exitCode = 2;
  }
} catch {
  console.error("The chapter edit could not be checked. Retry after reading the current chapter revision.");
  process.exitCode = 2;
}
