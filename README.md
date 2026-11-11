# Task 23 — Testing with Vitest & React Testing Library

A complete standalone **TypeScript + React Expense Tracker** with automated unit, component, hook, and integration tests. This is a reconstructed standalone implementation for Task 23; it is **not** a modification of the original Task 21 repository (which was not provided).

## Requirements
Node.js 20+ and npm.

## Getting started
```bash
npm install
npm run dev
```
Open the local address displayed by Vite.

## Run tests
```bash
npm run test:run
npm test
npm run test:ui
npm run test:coverage
npm run build
```

## Test coverage
- **Utility:** currency formatting, valid/invalid dates, category totals, category/week/month/combined filtering.
- **Components:** ExpenseCard render/delete, SummaryStats totals/highest/category count/empty state, ExpenseForm fields/validation/submission/reset.
- **Hooks:** useDebounce timing; useLocalStorage read/write/default.
- **Integration:** adding an expense renders a new card.
- Tests are colocated in `__tests__` folders. No real API requests are needed; this standalone app uses localStorage.

## Concepts / mentor write-up
**Unit vs component tests:** Unit tests check pure functions independently. Component tests render React UI and assert visible output or interactions.

**describe, it, expect:** `describe` groups tests, `it` names one case, and `expect` verifies the result.

**render, screen, userEvent:** `render` mounts a component in jsdom, `screen` queries accessible elements, and `userEvent` simulates real interactions.

**vi.fn():** A spy/mock function used to verify callbacks and their arguments, such as delete or add.

**renderHook and act:** `renderHook` mounts a custom hook for testing; `act` flushes React updates during state/timer changes.

**Mocking APIs:** In a networked version, use `vi.mock` to replace API modules and `mockResolvedValueOnce` to simulate responses; tests should not depend on a live backend. This standalone implementation has no API calls to mock.

**Async tests:** Await user interactions and use `findBy...` or `waitFor` when UI updates asynchronously. The debounce tests use fake timers for deterministic delays.

**Coverage:** `npm run test:coverage` produces terminal results and `coverage/index.html`. Coverage percentage depends on the executed suite and is not claimed in advance.

## Submission checklist
1. Run `npm install` and `npm run test:run` and capture a screenshot showing passing tests.
2. Run `npm run test:coverage` and capture the coverage table (optional bonus).
3. Push the complete project to your own GitHub repository and share its URL.
4. Mention that this is a standalone recreation unless you merge the tests into your actual Task 21 repository.

## Tech stack
React 19, TypeScript, Vite, Vitest, React Testing Library, user-event, jest-dom, jsdom, localStorage.
