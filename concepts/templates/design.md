# {Feature Name} Design Document

## 1. Vision

**{Final goal expressed in one sentence}**

### Why It's Needed

{Current problems and what this feature solves}

### What Success Enables

1. {Capability 1}
2. {Capability 2}
3. {Capability 3}

---

## 2. Design Principles

| Principle | Description |
|-----------|-------------|
| {Principle 1} | {Description} |
| {Principle 2} | {Description} |

---

## 3. Current State Analysis

### 3.1 Existing Implementation

| Feature | Status | Issues |
|---------|--------|--------|
| {Feature 1} | ✅ Implemented | - |
| {Feature 2} | ⚠️ Partial | {Issue} |
| {Feature 3} | ❌ Not implemented | {Why needed} |

### 3.2 Current Limitations

Currently unable to:
1. {Limitation 1}
2. {Limitation 2}

---

## 4. Phase Design

### Phase 1: {Phase 1 Name}

#### Purpose
{What this phase achieves}

#### Why It's Needed
{Why this phase must come first}

#### Goals
- {Functional requirement 1: e.g., Users can sign up with email}
- {Functional requirement 2: e.g., Sessions are persisted across page reloads}
- {Functional requirement 3: e.g., Invalid credentials return appropriate error}

#### Success Criteria
1. {Criterion 1}
2. {Criterion 2}

#### Data Model

```
{EntityName} {
  id: UUID
  // ...field definitions
}
```

#### Dependencies
- None (or list dependencies)

---

### Phase 2: {Phase 2 Name}

#### Purpose
{What this phase achieves}

#### Why It's Needed
{What builds on Phase 1}

#### Goals
- {Functional requirement 1}
- {Functional requirement 2}

#### Success Criteria
1. {Criterion 1}
2. {Criterion 2}

#### Dependencies
- Phase 1

---

## 5. Verification Methods

### Phase 1 Verification Scenario

```
1. {Action 1}
2. {Action 2}
3. Expected result: {Result}
```

### Phase 2 Verification Scenario

```
1. {Action 1}
2. {Action 2}
3. Expected result: {Result}
```

---

## 6. Future Plans (Optional)

{Phase 3 and beyond, or future extensions to consider}
