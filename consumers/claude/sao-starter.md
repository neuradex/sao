---
allowed-tools: Read, Write, Bash, AskUserQuestion, Glob, Grep, Task
description: Set up a project following the SAO protocol
argument-hint: [project-name]
---

# SAO Starter

Set up a new project following the SAO (Stateful Agent Orchestration) protocol.

## Procedure

### 1. Review SAO Specification

First read `.claude/sao/concepts/README.md` to understand the SAO methodology.

### 2. Requirements Gathering

Use the AskUserQuestion tool to collect the following.

#### What to Ask the User (Logical Requirements Only)

```
┌─────────────────────────────────────────────────────────────┐
│ [Required] Questions for the User                           │
├─────────────────────────────────────────────────────────────┤
│ □ Project name                                              │
│   → Short, easily identifiable name                         │
│                                                             │
│ □ What do you want to achieve? (Vision)                     │
│   → What should the final state look like?                  │
│                                                             │
│ □ Why is this needed? (Background/Motivation)               │
│   → Current problems, pain points                           │
│                                                             │
│ □ Definition of success                                     │
│   → What needs to work to consider it complete?             │
│                                                             │
│ □ Out of scope (What NOT to do)                             │
│   → Things explicitly excluded from scope                   │
└─────────────────────────────────────────────────────────────┘
```

#### What Claude Investigates (Physical Implementation)

```
┌─────────────────────────────────────────────────────────────┐
│ [Investigation] Claude examines the codebase and reports    │
├─────────────────────────────────────────────────────────────┤
│ □ Related existing code/files                               │
│   → Search for related code with Grep/Glob                  │
│   → Report "This part seems related"                        │
│                                                             │
│ □ Current implementation status                             │
│   → Investigate what's already implemented                  │
│   → Report "XX is implemented, YY is not implemented"       │
│                                                             │
│ □ Technical constraints/dependencies                        │
│   → Check technology stack and patterns in use              │
│   → Recommend "Should follow existing XX pattern"           │
│                                                             │
│ □ Files that need changes                                   │
│   → Identify scope of impact                                │
│   → Report "The following files need to be modified"        │
└─────────────────────────────────────────────────────────────┘
```

#### What Claude Designs

```
┌─────────────────────────────────────────────────────────────┐
│ [Design] Claude designs based on hearing + investigation    │
├─────────────────────────────────────────────────────────────┤
│ - Phase breakdown (number, names, order)                    │
│ - Purpose and success criteria for each phase               │
│ - Step breakdown and task lists                             │
│ - Verification scenarios                                    │
│ - Dependencies                                              │
│ - Implementation order                                      │
│ - Data models (if needed)                                   │
└─────────────────────────────────────────────────────────────┘
```

---

#### Flow from Hearing to Design

**Step 1: Project Name**
- Use argument `$ARGUMENTS` if provided
- Otherwise ask

**Step 2: Logical Requirements Gathering**
```
Please tell me about this project:

1. What do you want to achieve? (What should the final state look like?)
2. Why is this needed? (Current problems/pain points)
3. What defines success? (Completion criteria)
4. Is there anything out of scope? (What NOT to do)
```

**Step 3: Codebase Investigation**
Based on user answers, Claude investigates the code:
- Search for related code with Grep/Glob
- Check existing implementation patterns
- Identify scope of impact

**Step 4: Report and Confirm Investigation Results**
```
Reporting investigation results:

[Related Code]
- packages/api/src/xxx/ - XX implementation
- packages/web/src/components/xxx/ - YY UI

[Current Implementation Status]
- ✅ XX is implemented
- ⚠️ YY is partially implemented
- ❌ ZZ is not implemented

[Technical Considerations]
- Need to follow existing XX pattern
- Need to maintain consistency with YY

Does this understanding look correct?
```

**Step 5: Dig Deeper on Unclear Points**
- Ask additional questions if anything is ambiguous
- Accurately understand user intent

**Step 6: Clarify Abstract Expressions (Required)**

⚠️ **Logically clarify user's abstract expressions to make them concrete.**

Proceeding with ambiguity leads to major rework later.

```
[Examples of Logical Clarification]

User: "Make it easier to use"
  → Question: Easier for whom? (Target users)
  → Question: Which operations/features? (Scope)
  → Question: What makes it hard to use now? (Current issues)

User: "Make it faster"
  → Question: Which processing to speed up? (Scope)
  → Question: Under what conditions does it feel slow? (Conditions)
  → Question: Compared to what? (Comparison target)

User: "Handle it flexibly"
  → Question: What cases do you want to handle? (Use cases)
  → Question: Are there cases you don't need to handle? (Boundaries)
  → Question: Should we consider future extensions? (Scope)
```

**Clarification Rules:**
- Adjectives (fast, easy-to-use, flexible) → Logically define target, conditions, scope
- "etc.", "and so on" → List specific cases and confirm boundaries
- "if possible", "would be nice" → Clarify must-have vs. nice-to-have

**Note:** Only ask for physical numbers (seconds, step counts) when the user explicitly requests number-based improvements. Numbers can change during implementation, so prioritize logical definitions.

### 3. Specification Analysis and Design

Based on collected information, analyze and design the following:

#### 3.1 Determine Feature Necessity (Required)

⚠️ **Classify features that emerged during basic design as "necessary" or "unnecessary".**

Trying to implement everything leads to scope bloat and failure.

```
[Feature Classification]

┌─────────────────────────────────────────────────────────────┐
│ Must Have                                                   │
│   → Cannot achieve project purpose without it               │
│   → Must include in first release                           │
├─────────────────────────────────────────────────────────────┤
│ Should Have                                                 │
│   → Significantly increases value if present                │
│   → Implement if time permits                               │
├─────────────────────────────────────────────────────────────┤
│ Nice to Have                                                │
│   → Can achieve purpose without it                          │
│   → Record only as future extension                         │
├─────────────────────────────────────────────────────────────┤
│ Out of Scope                                                │
│   → Explicitly decided not to do                            │
│   → Record in design.md to prevent future confusion         │
└─────────────────────────────────────────────────────────────┘
```

**Confirm with AskUserQuestion:**
```
I've classified the features. Does this look correct?

[Must Have]
- Feature A: XX
- Feature B: YY

[Should Have (if time permits)]
- Feature C: ZZ

[Out of Scope (not doing this time)]
- Feature D: WW
```

#### 3.2 Scope Clarification
- What's in scope and what's out
- Assumptions and constraints

#### 3.3 Phase Breakdown Design
Determine appropriate number of phases and content based on:

- **Dependencies**: What must be completed first
- **Verifiability**: Can each phase be independently verified
- **Risk**: Where is technical uncertainty (address early)
- **Value**: Order to deliver value to users quickly

**Phase Count Guidelines:**
- ~1 week → 2-3 phases
- 2-4 weeks → 3-4 phases
- 1+ month → 4-5 phases

#### 3.4 Define Each Phase
For each phase:
- Name (concise)
- Purpose (1 sentence)
- Main tasks (3-5)
- Success criteria (verifiable)
- Dependencies

### 4. Detect Contradictions and Mitigate Risks (Required)

⚠️ **Before creating the setup, verify there are no contradictions in user instructions.**

Leaving contradictions leads to major problems during implementation.

#### 4.1 Check Contradiction Patterns

```
[Common Contradiction Patterns]

□ Purpose vs Scope contradiction
  Example: "Keep it simple" + "Handle every case"
  → Confirm which to prioritize

□ Time vs Quality contradiction
  Example: "Need it soon" + "Perfect quality"
  → Clarify trade-offs

□ Inter-requirement contradiction
  Example: "Delete A" + "Keep B that depends on A"
  → Organize dependencies

□ Existing system contradiction
  Example: "Introduce new approach" + "Full backward compatibility"
  → Confirm migration strategy
```

#### 4.2 Identify Potential Risks

```
[Potential Risk Checklist]

□ Technical Risk
  - Are there uncertain parts regarding feasibility?
  - External dependency risks (APIs, libraries)?

□ Scope Risk
  - Are there "won't know until we try" parts?
  - Could hidden requirements emerge later?

□ Integration Risk
  - Could problems occur integrating with existing systems?
  - Conflicts with other ongoing projects?
```

#### 4.3 Report to User

If contradictions or risks are found, **always report to user before setup**:

```
## ⚠️ Points Requiring Confirmation

### Contradictions
1. "Want XX" and "Want YY" are incompatible
   → Proposal: Prioritize ZZ, defer WW to Phase 2+

### Potential Risks
1. Feasibility of XX is uncertain
   → Proposal: Do technical validation first in Phase 1

May I proceed with setup after resolving these points?
```

---

### 5. Present Design Proposal and Get Approval

Present analysis results to user:

```
## SAO Project Design Proposal

**Project Name:** {Name}
**Purpose:** {One sentence}

### Phase Structure

| Phase | Name | Purpose | Main Tasks |
|-------|------|---------|------------|
| 1 | {Name} | {Purpose} | {Task summary} |
| 2 | {Name} | {Purpose} | {Task summary} |
| ... | ... | ... | ... |

### Dependencies

```
Phase 1 → Phase 2 → Phase 3
```

### Expected Out of Scope

- {Out of scope 1}
- {Out of scope 2}

---

Does this design look good?
```

Get approval with AskUserQuestion:
- "Proceed with this design"
- "Want to modify some points"

If modifications needed, incorporate feedback and re-present.

### 6. Create Directory Structure

After approval, create:

```bash
mkdir -p .claude/sao/projects/active/{project-name}/phase1
mkdir -p .claude/sao/projects/active/{project-name}/phase2
# ... according to number of phases
```

### 7. Generate Documents

Load templates and generate with design content:

| Template | Output |
|----------|--------|
| `.claude/sao/concepts/templates/project-readme.md` | `README.md` |
| `.claude/sao/concepts/templates/design.md` | `design.md` |
| `.claude/sao/concepts/templates/phase-readme.md` | `phaseN/README.md` |
| `.claude/sao/concepts/templates/implementation-plan.md` | `phaseN/implementation-plan.md` |

**Important**: Reflect not just template placeholders but specific content decided during design (phase names, purposes, tasks, success criteria).

### 8. Completion Report

```
## SAO Project Setup Complete

**Project Name:** {project-name}
**Location:** .claude/sao/projects/active/{project-name}/

### Created Files

- README.md (entry point)
- design.md (design document)
- phase1/README.md, implementation-plan.md
- ...

### Suggested Commit

> ```
> sao: [{project-name}] 🚀 Setup - {total-phases} phases
>
> - Phase 1: {phase-1-name}
> - Phase 2: {phase-2-name}
> - ...
> ```
>
> Example:
> ```
> sao: [auth-system] 🚀 Setup - 4 phases
>
> - Phase 1: Database schema
> - Phase 2: API implementation
> - Phase 3: Frontend implementation
> - Phase 4: Testing & verification
> ```

### Next Steps

1. Review and supplement each phase's implementation-plan.md
2. Start implementation from Phase 1

To start Phase 1, review the relevant README.md.
```

## Notes

- Warn if project directory already exists
- Ask additional questions if user requirements are ambiguous
- Consider technical feasibility when designing phases
- Avoid excessively granular phase breakdown (increases management overhead)
- **Output language**: Always output results and suggested commits in the user's language
