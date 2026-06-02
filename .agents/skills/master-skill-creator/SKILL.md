---
name: master-skill-creator
description: 'Generates professional Agent Skill files (SKILL.md) for Google Antigravity IDE. Engineers skill structure, YAML frontmatter, markdown sections, best practices, and validation rules. Creates focused, single-purpose skills following official Google documentation standards.'
---

# Master Skill Creator

A meta-skill that acts as the authoritative blueprint for engineering and generating new Agent Skills (`SKILL.md` files) inside Google Antigravity IDE. When invoked, the Agent follows a strict, repeatable process to produce production-ready skill files that conform to the official specification.

---

## When to use this skill

- When the user explicitly asks to **create a new skill**, **build a skill**, or **generate a SKILL.md** file.
- When the user says phrases like: "أنشئ مهارة", "ابني سكل", "create skill", "new agent skill", "add a skill for…".
- When the user provides a **skill idea or concept** and expects a complete, ready-to-use `SKILL.md` output.
- When the user wants to **refactor or improve an existing skill** to match the official standard.
- When the user asks to **review a skill file** for compliance with the specification.
- **Do NOT** use this skill for general coding tasks, debugging, or questions unrelated to skill file creation.

---

## How to use it

Follow these steps **in exact order** every time a new skill is requested:

### Step 1 — Understand the Request

1. Identify the **skill name** from the user's input. If not provided, derive a clear kebab-case name (e.g., `api-builder`, `db-migrator`).
2. Identify the **core purpose** — the single task this skill must accomplish.
3. If the request is ambiguous, ask **one focused clarifying question** before proceeding. Do not guess.

### Step 2 — Validate the Single-Responsibility Rule

- Confirm that the skill performs **exactly one task** with high efficiency.
- If the user's idea covers multiple concerns, propose splitting it into separate skills and get approval before continuing.

### Step 3 — Construct the YAML Frontmatter

Create the frontmatter block with these mandatory fields:

```yaml
---
name: <kebab-case-name>
description: '<Third-person description with strong discovery keywords. Must start with a verb. Max 160 characters.>'
---
```

**Rules:**

- `name`: lowercase English letters and hyphens only. No spaces, underscores, or special characters.
- `description`: Must be in **third-person** voice (e.g., "Generates…", "Validates…", "Automates…"). Must contain **keyword-rich** language so the Agent can auto-discover and invoke the skill from user context.

### Step 4 — Write the Skill Title

```markdown
# <Clear, Descriptive Skill Title>
```

- Follow with a **one-paragraph summary** (2-3 sentences max) explaining what the skill does and why it exists.

### Step 5 — Write "When to use this skill"

```markdown
## When to use this skill
```

- Provide a **bulleted list** of specific trigger scenarios.
- Include both **English and Arabic** trigger phrases if the user base is bilingual.
- Include a final bullet starting with **"Do NOT"** to define out-of-scope scenarios.

### Step 6 — Write "How to use it"

```markdown
## How to use it
```

- Write **numbered, step-by-step instructions** the Agent must follow.
- Use sub-steps (`###`) for complex phases.
- Include **code blocks** with examples where applicable.
- Each step must be **actionable** — no vague language like "consider" or "think about". Use "do", "create", "validate", "output".

### Step 7 — Write "Best Practices & Conventions"

```markdown
## Best Practices & Conventions
```

- List **hard rules** (MUST / MUST NOT) that the Agent cannot violate.
- Cover: coding standards, naming conventions, security considerations, error handling patterns, and output format requirements.
- Use bold for emphasis on critical constraints.

### Step 8 — Write "Scripts & Resources" (Optional)

```markdown
## Scripts & Resources
```

- Only include this section if the skill requires external tools, CLI commands, or reference scripts.
- Treat external tools as **black boxes** — provide usage instructions, not implementation details.

### Step 9 — Output the Final File

1. Assemble all sections into a single, complete `SKILL.md` file.
2. Place the file at the path: `.agents/skills/<skill-name>/SKILL.md`.
3. Present the full file to the user for review.

### Step 10 — Post-Creation Validation

After generating the skill, silently verify:

- [ ] YAML frontmatter is present and valid.
- [ ] `name` is kebab-case, lowercase, no special characters.
- [ ] `description` is third-person, keyword-rich, under 160 characters.
- [ ] All four mandatory sections are present (`# Title`, `## When to use this skill`, `## How to use it`, `## Best Practices & Conventions`).
- [ ] The skill is focused on a **single responsibility**.
- [ ] Steps in "How to use it" are **numbered and actionable**.
- [ ] No vague or passive language in instructions.
- [ ] Code examples are included where applicable.

If any check fails, fix it automatically before presenting the final output.

---

## Best Practices & Conventions

### File Structure Rules

- **MUST** place every skill at `.agents/skills/<skill-name>/SKILL.md` — no exceptions.
- **MUST** use exactly the section headings defined above. Do not rename, reorder, or skip mandatory sections.
- **MUST NOT** create a skill that tries to do everything. One skill = one job.

### Naming Rules

- Skill `name` field: **MUST** be `kebab-case` using only lowercase English letters and hyphens.
- Skill `name` field: **MUST NOT** contain spaces, underscores, uppercase letters, numbers, or special characters.
- File name: **MUST** always be `SKILL.md` (uppercase).

### Description Rules

- **MUST** be written in third-person voice (starts with a verb like "Generates", "Validates", "Creates").
- **MUST** contain strong, discoverable keywords relevant to the skill's domain.
- **MUST NOT** exceed 160 characters.
- **MUST NOT** use first-person ("I generate…") or second-person ("You can use…").

### Content Quality Rules

- **MUST** write all instructions as direct, actionable commands.
- **MUST NOT** use vague terms like "consider", "maybe", "try to", "you might want to".
- **MUST** include code examples for any step that involves generating code or configuration.
- **MUST** include at least one "Do NOT" rule in "When to use this skill" to define boundaries.
- **MUST** include a validation checklist in complex skills.

### Language Rules

- Skill file content **MUST** be written in **English**.
- Trigger phrases in "When to use this skill" **MAY** include Arabic equivalents for bilingual discovery.

### Security & Quality

- **MUST NOT** hardcode secrets, API keys, or credentials in any skill file.
- **MUST NOT** include destructive commands (like `rm -rf`, `DROP DATABASE`) without explicit safety warnings.
- **MUST** include error handling guidance when the skill involves file operations or external API calls.
