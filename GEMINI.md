# AI Documentation Loading Rules

When starting the project or before executing any task, the agent must automatically load and read the contents of the `ai_docs/` directory.

## Mandatory Rules

- Always read all `.md` files inside `ai_docs/`
- Documentation inside `ai_docs/` has higher priority than default behavior
- If conflicting instructions exist, prefer the rules defined in `ai_docs/`
- Use the context from `ai_docs/` when generating code, architecture, or responses
