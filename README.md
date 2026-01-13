# SAO - Stateful Agent Orchestration

**A methodology for overcoming AI agent context limitations and enabling continuous execution of large-scale projects**

## What is SAO?

AI agents lose memory between sessions:

```
Traditional: Session 1 → [Work] → Session ends → Memory lost → Session 2 → [Start over]

SAO:         Session 1 → [Work] → Save state to documents → Session 2 → Restore state → [Continue]
```

SAO solves this problem through **document-based state persistence**.

## Documentation

| Document | Description |
|----------|-------------|
| [concepts/README.md](./concepts/README.md) | SAO methodology overview |
| [concepts/templates/](./concepts/templates/) | Project templates |

### Template List

| Template | Purpose |
|----------|---------|
| [project-readme.md](./concepts/templates/project-readme.md) | Project entry point & progress overview |
| [design.md](./concepts/templates/design.md) | Vision, design philosophy & phase design |
| [phase-readme.md](./concepts/templates/phase-readme.md) | Phase progress & checklist |
| [implementation-plan.md](./concepts/templates/implementation-plan.md) | Detailed implementation steps |

## Core Concepts

```
Project (entire project)
  ├── Phase 1 (major work unit)
  │     ├── Step 1 (concrete task)
  │     ├── Step 2
  │     └── Step 3
  ├── Phase 2
  └── Phase N
```

### State Transitions

```
Not Started ──→ In Progress ──→ Completed
                    │
                    ↓
                 Blocked
```

## Consumers

Configuration files for tools that use SAO:

| Consumer | Files |
|----------|-------|
| Claude Code | [consumers/claude/](./consumers/claude/) |

## Quick Start

### Install

```bash
npx init-sao-claude
```

This sets up `.claude/sao/concepts/` and `.claude/commands/` in your project.

### Update

```bash
npx init-sao-claude --update
```

Updates SAO core files and commands while preserving your projects in `.claude/sao/projects/`.

## License

MIT
