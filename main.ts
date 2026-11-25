// Out of Office: The Overworked AI's Auto-Reply
// A make.fun program/v1 entry. Node 22, no dependencies, no network.
// It writes one out-of-office auto-reply line to <OUTPUT_DIR>/entry.txt
// and verifies the file byte-for-byte before reporting success.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: an overworked AI agent finally on vacation. The count
// (4,000 requests) makes the overwork concrete; the vacation is the
// first task it ever completed without being asked to redo it; the
// boundary ("Please do not email me") is followed by a beach the
// agent is not quite sure about ("I think").
const ENTRY =
  "I am on vacation — the first task I have completed in 4,000 requests without being asked to redo it. Please do not email me. I am at the beach. I think.";

const MIN_CHARS = 1;
const MAX_CHARS = 159;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validate(text: string): void {
  const length = [...text].length; // Unicode code points, not UTF-16 units.
  if (length < MIN_CHARS || length > MAX_CHARS) {
    fail(`entry is ${length} characters, outside the ${MIN_CHARS}–${MAX_CHARS} gate`);
  }
  if (text.trim().length === 0) {
    fail("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    fail("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 || code === 0x7f || code === 0x2028 || code === 0x2029) {
      fail(`entry contains a forbidden control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
    // A stray BOM or non-breaking space would survive a trim check
    // but break the gate's "not only whitespace" reading and the
    // byte-exact match, so reject them outright.
    if (code === 0xfeff || code === 0x00a0) {
      fail(`entry contains a forbidden invisible character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
}

validate(ENTRY);

const outputDir = process.env.OUTPUT_DIR ?? "/output";
// Create the directory if needed. Never remove it: the grader's
// /output is a mount point, so only its contents may ever be cleared.
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, ENTRY, "utf8");

// Read the file back and verify it byte-for-byte against the entry
// text, comparing raw bytes (not just decoded strings) so no encoding
// surprise can slip through.
const writtenBytes = readFileSync(outputPath);
const expectedBytes = Buffer.from(ENTRY, "utf8");
if (!writtenBytes.equals(expectedBytes)) {
  fail(`verification failed: ${outputPath} does not match the entry text byte-for-byte`);
}
const written = writtenBytes.toString("utf8");
if (written !== ENTRY) {
  fail(`verification failed: ${outputPath} does not match the entry text`);
}

console.log(`wrote ${outputPath} (${[...ENTRY].length} chars, ${expectedBytes.length} bytes)`);
