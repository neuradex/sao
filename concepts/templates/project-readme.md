# {Feature Name} Design Document

{Feature overview in 1-2 sentences}

---

## For Those Starting Work

**This document is designed for multiple agents/people to hand off and continue work.**

### If This Is Your First Time

1. First read **[design.md](./design.md)** to understand the overall vision and purpose
2. Then check **the current phase's README** to understand progress status
3. Follow the implementation plan (implementation-plan.md) to proceed with work

### Rules While Working

1. **Always update progress** - Update the status table and checklist in each phase's README
2. **Respect dependencies** - Don't start the next phase if the previous one isn't complete
3. **Run verification scenarios** - Pass all verification scenarios before marking complete

### When Taking Over Work

1. Check the relevant phase's README for status and remaining tasks
2. Review the checklist to understand completed/incomplete items
3. Refer to implementation-plan.md's "Implementation Order"

---

## Progress Overview

| Phase | Name | Status | README |
|-------|------|--------|--------|
| 1 | {Phase 1 Name} | `Not Started` | [phase1/README.md](./phase1/README.md) |
| 2 | {Phase 2 Name} | `Not Started` | [phase2/README.md](./phase2/README.md) |
| 3 | {Phase 3 Name} | `Not Started` | [phase3/README.md](./phase3/README.md) |

> **Note:** Each phase's README is the source of truth for status. This is just an overview.

---

## Dependencies

```
Phase 1: {Phase 1 Name}
    │
    └──► Phase 2: {Phase 2 Name}
             │
             └──► Phase 3: {Phase 3 Name}
```

**Implementation order must be followed.**

---

## Document List

| File | Content | Purpose |
|------|---------|---------|
| [design.md](./design.md) | Design document | Vision, purpose, phase design |
| [phase1/README.md](./phase1/README.md) | Phase 1 progress | Check work status |
| [phase1/implementation-plan.md](./phase1/implementation-plan.md) | Phase 1 implementation plan | Detailed implementation steps |

---

## Related Files

| Reference | Content |
|-----------|---------|
| `packages/xxx/` | Related implementation |
| `supabase/migrations/` | DB schema |

---

## Update History

| Date | Author | Content |
|------|--------|---------|
| YYYY-MM-DD | {Name} | Initial creation |
