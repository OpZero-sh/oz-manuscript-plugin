// Runs before this plugin's delete_chapter and delete_manuscript tools. Both are
// permanent, so the user is asked to confirm each. Reads the hook event from
// stdin, writes a decision to stdout, and does nothing else: no files, no
// network.
const fs = require("node:fs");

let event = null;
try {
  event = JSON.parse(fs.readFileSync(0, "utf8"));
} catch {
  event = null;
}
const toolName = event && typeof event.tool_name === "string" ? event.tool_name : "";
const toolInput = event && event.tool_input ? event.tool_input : {};
const text = value => (typeof value === "string" && value.trim() ? value.trim() : "");
const manuscript = text(toolInput.manuscript);
const chapter = text(toolInput.chapter);

let reason = "This Oz Manuscript delete could not be checked. Confirm it before proceeding.";
if (toolName.endsWith("__delete_manuscript")) {
  reason = "This permanently deletes the manuscript" + (manuscript ? " " + manuscript : "") + " with all of its chapters and notes. It cannot be restored.";
} else if (toolName.endsWith("__delete_chapter")) {
  reason = "This permanently deletes chapter" + (chapter ? " " + chapter : "") + (manuscript ? " of " + manuscript : "") + " and the notes attached to it. It cannot be restored.";
}

process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "ask",
    permissionDecisionReason: reason
  }
}));
