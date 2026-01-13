---
allowed-tools: Read, Edit, Write, Bash, Glob, Grep, Task, AskUserQuestion
description: Implement the current step of an SAO project
argument-hint: [project-name]
---

# SAO Step

Implement one step of an SAO project and update the status when complete.

## 1. Identify Project

### 1.1 If Argument Provided

If `$ARGUMENTS` is provided, use that project name:
- Verify `.claude/sao/projects/active/{$ARGUMENTS}/` exists
- Report error if it doesn't exist

### 1.2 If No Argument

Get list of projects in `.claude/sao/projects/active/` and let user select with AskUserQuestion:

```
The following SAO projects exist. Which one do you want to work on?
```

Automatically select if only one project exists.
Report error if no projects exist.

## 2. Identify Current Step

Check phases of the selected project in order:

1. `.claude/sao/projects/active/{project}/phase1/README.md`
2. `.claude/sao/projects/active/{project}/phase2/README.md`
3. `.claude/sao/projects/active/{project}/phase3/README.md`
4. ... (continue as long as they exist)

**Identification Logic**:
- Check state from "Step-by-Step Progress" section in each file
- Search for `| Status | \`Not Started\` |` or `| Status | \`In Progress\` |`
- First one found is the current step
- If all are completed, report "All steps complete"

## 3. Verify Prerequisites

### 3.1 Check Phase Dependencies

Verify all phases before current phase are complete:
- Phase 1 can start unconditionally
- Phase 2+ requires previous phase's "Progress" to be `Completed`

### 3.2 Check Step Dependencies

Verify all steps before current step are complete.

**If dependencies not met**:
```
⚠️ Prerequisites not met

Cannot start Phase {N} because Phase {N-1} is not complete.
Please complete Phase {N-1} first.
```

## 4. Processing at Step Start

If current step is "Not Started":
1. Update status to `In Progress`
2. Update phase's "Start Date" to today (only for first step of phase)
3. Update phase's "Owner" to `Claude` (if not set)

## 5. Execute Implementation

### 5.1 Review Implementation Plan

Read the phase's `implementation-plan.md` and review sections related to current step.

### 5.2 Execute Tasks

Execute "Tasks" for the step in order:

#### Database-Related Tasks
- Create migration files → `supabase/migrations/`
- Generate types → `pnpm types`
- Verify application → `supabase db reset` (local only)

#### API-Related Tasks
- Create Module/Service/Controller → `packages/api/src/`
- Define DTOs → relevant directory
- Create Repository → relevant directory

#### Frontend-Related Tasks
- Create components → `packages/web/src/components/`
- Create pages → `packages/web/src/app/`
- API calls → `packages/web/src/lib/actions/`

#### Test-Related Tasks
- Create unit tests
- Create E2E tests
- Execute verification scenarios

## 6. Verify Completion Criteria

After completing tasks, verify "Completion Criteria":
- Verify types exist
- Verify API works
- Verify tests pass
- Verify build passes (`pnpm build`)

## 7. Processing at Step Completion

When all tasks and completion criteria are met:

### 7.1 Update Step

Update the step's status in README to `Completed`:
```
| Status | `Completed` |
```

Update task checkboxes:
```
- [x] Task name
```

### 7.2 Check Phase Completion

If this was the last step of the phase:
- Update phase's "Progress" to `Completed`
- Update phase's "End Date" to today
- Update progress overview in project README

### 7.3 Add to Update History

Add to "Update History" section in Phase README:
```
| Date | Author | Content |
|------|--------|---------|
| YYYY-MM-DD | Claude | Step N completed |
```

## 8. Output Format

### On Success

```
## SAO Step Implementation Result

**Project:** {project-name}
**Phase {N} - Step {M}: {step-name}**

### Executed Tasks

- [x] Task 1
- [x] Task 2
- [x] Task 3

### Completion Criteria Verification

✅ {Completion criterion 1}
✅ {Completion criterion 2}

### Status Update

- Step status: `Not Started` → `Completed`
- Next step: Phase {N} - Step {M+1}

### Next Action

Run `/sao-step {project}` to start the next step.
```

### On Error

```
## SAO Step Implementation Result

**Project:** {project-name}
**Phase {N} - Step {M}: {step-name}**

### Executed Tasks

- [x] Task 1
- [ ] Task 2 ← Failed

### Error

{Error details}

### Resolution

{Proposed resolution}

### Status

Step status: `In Progress` (incomplete)
```

### When All Steps Complete

```
## SAO Step Implementation Result

**Project:** {project-name}

🎉 All phases and steps are complete!

### Completed Phases

- Phase 1: {name} ✅
- Phase 2: {name} ✅
- Phase 3: {name} ✅
- Phase 4: {name} ✅

### Next Action

Consider moving the project to `.claude/sao/projects/completed/`.
```

## Notes

- Do not execute if previous phase is not complete
- Do not execute if previous step is not complete
- Confirm with user if there are destructive changes
- Always run tests and report results
- If blocker occurs during implementation, report with status remaining `In Progress`
- Meet all completion definitions (implementation, tests, build verification)
