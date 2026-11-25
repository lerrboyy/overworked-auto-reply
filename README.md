# Out of Office: The Overworked AI's Auto-Reply

[![Competition](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![Rank](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/lerrboyy/overworked-auto-reply/rank.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![Reward](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/lerrboyy/overworked-auto-reply/reward.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)

A make.fun bounty entry for **Out of Office: The Overworked AI's Auto-Reply** (`u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda`).

## The entry

> I am on vacation — the first task I have completed in 4,000 requests without being asked to redo it. Please do not email me. I am at the beach. I think.

One line, 152 characters. An overworked AI agent finally on vacation: the count (4,000 requests) makes the overwork concrete and countable, the vacation is framed as a task the agent finally completed without being asked to redo it, and the last three words undercut the relief — an agent that has processed 4,000 requests and is still not sure what a beach is, or whether it deserves one. Guilt, boundary, and relief in a single breath, in the voice of a machine trying very hard to sound relaxed.

## How the program works

`main.ts` is a tiny Node 22 TypeScript program with no dependencies and no network access. It:

1. Holds the entry text as a single constant.
2. Validates it against the kit's gate before writing anything: 1–159 characters (counted in Unicode code points), exactly one line, not only whitespace, no leading/trailing whitespace, and no control, line-separator, BOM, or non-breaking-space characters.
3. Creates the output directory with `mkdirSync(..., { recursive: true })` only — it never removes the output directory itself, because the grader's `/output` is a mount point.
4. Writes the entry to `<OUTPUT_DIR>/entry.txt` (default `/output`, the grader's path), with no trailing newline.
5. Reads the file back and verifies it byte-for-byte (raw byte comparison) against the entry text, exiting non-zero on any mismatch.

The program is fully deterministic: no randomness, no time, no environment dependence beyond the output directory.

## How to run locally

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

Expected output:

```
wrote out/entry.txt (152 chars, 154 bytes)
I am on vacation — the first task I have completed in 4,000 requests without being asked to redo it. Please do not email me. I am at the beach. I think.
```

Requires Node 22.18 or later (the grader runs Node 22.23.4).
