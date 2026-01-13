# Stateful Agent Orchestration (SAO)

**A methodology for overcoming AI agent context limitations and enabling continuous execution of large-scale projects**

---

## How to Use This Document

| Purpose | Reference |
|---------|-----------|
| Understand what SAO is | [1. Overview](#1-overview) |
| Start a new project with SAO | [5. Setup Procedure](#5-setup-procedure) |
| Take over an existing project | [6. Handoff Protocol](#6-handoff-protocol) |
| Copy templates | [4. Templates](#4-templates) |

---

## 1. Overview

### 1.1 What is SAO?

**Stateful Agent Orchestration (SAO)** is a methodology that solves AI agent memory limitations through **document-based state persistence**.

```
Traditional AI Agent:
  Session 1 → [Work] → Session ends → Memory lost
  Session 2 → [Start over from scratch]

With SAO:
  Session 1 → [Work] → Save state to documents → Session ends
  Session 2 → Restore state from documents → [Continue where left off]
```

### 1.2 Three Pillars

| Pillar | Role |
|--------|------|
| **Structured Documents** | Container for storing state |
| **Explicit State Management** | What has been completed and how far |
| **Standardized Handoff** | Next agent doesn't get lost |

### 1.3 When to Use

**Use SAO when:**
- [ ] Scope exceeds a single session
- [ ] Has 3 or more phases
- [ ] Multiple agents/people are involved
- [ ] Takes more than a week

**Don't need SAO when:**
- Can be completed in one session
- Simple bug fix
- Independent small task

---

## 2. Core Concepts

### 2.1 Structure

```
Project (entire project)
  │
  ├── Phase 1 (major work unit)
  │     ├── Step 1 (concrete task)
  │     ├── Step 2
  │     └── Step 3
  │
  ├── Phase 2
  │     └── ...
  │
  └── Phase N
```

### 2.2 States

```
Phase/Step state transitions:

  Not Started ───→ In Progress ───→ Completed
                        │
                        ↓
                    Blocked
```

### 2.3 Dependencies

```
Phase 1 ───→ Phase 2 ───→ Phase 3
   │                         ↑
   └─────────────────────────┘

* Cannot proceed to next phase until previous is completed
```

---

## 3. Document Structure

### 3.1 Required Files

```
.claude/sao/projects/active/{project-name}/
├── README.md                    # Entry point & progress overview
├── design.md                    # Vision & design
├── phase1/
│   ├── README.md               # Phase state & checklist
│   └── implementation-plan.md  # Detailed implementation plan
├── phase2/
│   ├── README.md
│   └── implementation-plan.md
└── ...
```

### 3.2 Role of Each File

| File | Role | Update Frequency |
|------|------|------------------|
| `README.md` | Entry point, progress overview, handoff info | On phase completion |
| `design.md` | Vision, design philosophy, phase design | On design changes |
| `phaseN/README.md` | Phase progress, checklist | Every work session |
| `phaseN/implementation-plan.md` | Detailed implementation steps | On plan changes |

---

## 4. Templates

| Template | Purpose | File |
|----------|---------|------|
| Project README | Project entry point & progress overview | [templates/project-readme.md](./templates/project-readme.md) |
| Design Document | Vision, design philosophy & phase design | [templates/design.md](./templates/design.md) |
| Phase README | Phase progress & checklist | [templates/phase-readme.md](./templates/phase-readme.md) |
| Implementation Plan | Detailed implementation steps | [templates/implementation-plan.md](./templates/implementation-plan.md) |

---

## 5. Setup Procedure

### 5.1 Starting a New Project

```bash
# 1. Create directories
mkdir -p .claude/sao/projects/active/{project-name}/phase1
mkdir -p .claude/sao/projects/active/{project-name}/phase2
# Create as many phases as needed

# 2. Create files (copy from templates)
touch .claude/sao/projects/active/{project-name}/README.md
touch .claude/sao/projects/active/{project-name}/design.md
touch .claude/sao/projects/active/{project-name}/phase1/README.md
touch .claude/sao/projects/active/{project-name}/phase1/implementation-plan.md
# Repeat for each phase
```

### 5.2 Initialization Checklist

```markdown
## SAO Project Initialization Checklist

### 1. Planning Phase
- [ ] Clarify project purpose
- [ ] Decide phase breakdown (3-5 phases recommended)
- [ ] Organize dependencies between phases
- [ ] Define success criteria

### 2. Document Creation
- [ ] Create directory structure
- [ ] Create README.md (entry point)
- [ ] Create design.md (design document)
- [ ] Create each Phase README.md
- [ ] Create each Phase implementation-plan.md

### 3. Content Population
- [ ] Document vision and purpose
- [ ] Document each phase's purpose and success criteria
- [ ] Create dependency diagram
- [ ] Define verification scenarios
- [ ] Create list of related files

### 4. Review
- [ ] Verify a new agent can read and understand
- [ ] Check for ambiguous expressions
- [ ] Verify completion criteria are clear
```

### 5.3 Example Instructions for AI Agent

```
I want to manage the following task using SAO (Stateful Agent Orchestration).

Task: {task description}

1. First read .claude/sao/concepts/README.md to understand the SAO methodology
2. Set up the SAO document structure at .claude/sao/projects/active/{project-name}/
3. Create the following using templates:
   - README.md (entry point)
   - design.md (design document)
   - phase1/README.md, implementation-plan.md
   - (as many phases as needed)

Proposed phase breakdown:
- Phase 1: {overview}
- Phase 2: {overview}
- Phase 3: {overview}
```

---

## 6. Handoff Protocol

### 6.1 At Session Start (Receiving Handoff)

```
┌─────────────────────────────────────────┐
│ 1. Read project README                  │
│    → Understand overview and progress   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 2. Read design.md                       │
│    → Understand vision and design       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 3. Read current Phase README            │
│    → Understand detailed progress/tasks │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 4. Read implementation-plan.md          │
│    → Check specific implementation      │
│    → ⚠️ Evaluate critically as proposal │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 5. Start work                           │
└─────────────────────────────────────────┘
```

#### Critical Approach to implementation-plan

**Important: Treat implementation-plan as a "proposal", not a "perfect plan".**

Implementers should work with this mindset:

1. **Question the plan**: Always be aware the plan may diverge from reality
2. **Fill gaps**: If the plan is lacking, check subsequent steps first
3. **Judge autonomously**: If subsequent steps don't help, make your own judgment and implement
4. **Document deviations**: Always note additional implementations not in the plan in the Phase README

```markdown
## Update History (Example of Notes)

| Date | Author | Content |
|------|--------|---------|
| 2025-01-13 | Agent | Step 2 completed. Added error handling not in plan (reason: API spec change) |
```

### 6.2 At Session End (Handing Off)

```
┌─────────────────────────────────────────┐
│ 1. Update checklist                     │
│    → Check completed tasks              │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 2. Update status                        │
│    → Update Phase/Step state            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 3. Add to update history                │
│    → Date, author, content              │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 4. Document incomplete tasks            │
│    → What to do next                    │
│    → Document any blockers              │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│ 5. Commit and push                      │
└─────────────────────────────────────────┘
```

### 6.3 Handoff Checklist

```markdown
## Session End Checklist

- [ ] Checked off completed tasks
- [ ] Updated Phase/Step status
- [ ] Added this session's work to update history
- [ ] Documented next actions for incomplete tasks
- [ ] Documented any blockers
- [ ] Committed and pushed changes
```

---

## 7. Operational Rules

### 7.1 Status Update Rules

| Situation | Action |
|-----------|--------|
| Task completed | Check it off immediately |
| Step completed | Update status to `Completed` |
| Phase completed | Update status + update progress overview |
| Blocker encountered | Set status to `Blocked` + document reason |

### 7.2 Dependency Rules

1. **Enforce forward dependencies**: Cannot start until dependency is `Completed`
2. **No skipping**: No jumping from Phase 1 → Phase 3
3. **Document reasons**: If changing dependencies, document why

### 7.3 Document Update Rules

| DO | DON'T |
|----|-------|
| Update immediately after work | Batch updates later |
| Explicitly state status | Rely on implicit understanding |
| Be specific about completion criteria | Use vague expressions |
| Write why (reasons) | Write only what (facts) |

---

## 8. Troubleshooting

### 8.1 Common Problems

| Problem | Cause | Solution |
|---------|-------|----------|
| Next agent can't understand situation | Missed document update | Strictly follow session end checklist |
| Dependencies broken | Skipped a phase | Complete dependencies first |
| Completion criteria unclear | Insufficient definition | Document specific verification methods |
| Can't tell progress | Status not updated | Update after every work session |

### 8.2 Recovery Procedure

**If state becomes unclear:**

1. Check each Phase README's checklist
2. Compare with actual codebase
3. Update documents to accurately reflect state
4. Note "state recovery" in update history

---

## 9. Practical Example

### 9.1 Memory System (Example from this repository)

```
.claude/sao/projects/active/memory/
├── README.md           # Entry point
├── design.md           # Design document (vision, phase design)
├── phase1/             # Episodic memory foundation
├── phase2/             # Semantic memory integration
├── phase3/             # Timeline enhancement
└── phase4/             # Search integration
```

**Characteristics:**
- 4-phase structure
- Design modeled on human memory systems
- Clear success criteria for each phase

### 9.2 References

- [Memory System Design Document](../projects/active/memory/design.md)
- [Phase 1 README](../projects/active/memory/phase1/README.md)

---

## 10. Update History

| Date | Author | Content |
|------|--------|---------|
| 2025-01-13 | Claude | Created initial SAO specification and setup guide |
