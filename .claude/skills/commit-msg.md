# commit-msg

Generate and run a conventional commit from staged changes.

## Trigger

Run when the user says "write a commit message", "generate a commit", "commit my changes", or invokes `/commit-msg`.

## Workflow

### Step 1 — Verify staged changes

Run:

```bash
git diff --staged --stat
```

If the output is empty, stop immediately and tell the user:
> Nothing is staged. Run `git add <files>` first, then try again.

### Step 2 — Read the full staged diff

Run:

```bash
git diff --staged
```

Read the output carefully: what files changed, what was added/removed, and why the change exists (infer from context if not explicit).

### Step 3 — Generate the commit message

Format:

```
type(scope): short subject

- bullet of what changed
- bullet of why (if inferable)
```

Rules:
- **type** — one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`
- **scope** — the area of the codebase affected (e.g., `home`, `api`, `navbar`, `watchlist`). Omit if the change is truly cross-cutting.
- **subject** — imperative mood, under 60 characters, no trailing period
- **body bullets** — optional but encouraged; explain *what* and *why*, not *how*
- Never include a `Co-Authored-By` trailer

Show the message to the user before committing so they can confirm or adjust.

### Step 4 — Commit

After user confirms (or if they say to proceed without review), run:

```bash
git commit -m "$(cat <<'EOF'
type(scope): subject

- bullet
- bullet
EOF
)"
```

Use a HEREDOC to preserve formatting. Do not use `--no-verify` unless the user explicitly asks.
