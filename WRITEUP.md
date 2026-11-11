
# Task 23 – Vitest & React Testing Library
## Testing Concepts – Write-up

### 1. What is the difference between a unit test and an integration test? Give one example of each from your test files.

**Unit Test:**

A unit test checks a single function or component independently to verify that it works correctly.

**Example from my project:**

File: `formatters.test.ts`

I tested the `formatCurrency()` function to verify that it correctly converts a number into Indian currency format.

```typescript
expect(formatCurrency(1500)).toBe('₹1,500.00');
```

**Integration Test:**

An integration test checks whether multiple components work together correctly.

**Example from my project:**

File: `App.integration.test.tsx`

I tested the complete expense creation flow:

1. Enter the expense title.
2. Enter the amount.
3. Click the Add Expense button.
4. Verify that the new expense appears on the screen.

**Difference:** Unit tests check individual functionality, while integration tests check how different parts of the application work together.

---

### 2. What does vi.fn() do, and why do you need it when testing a component that receives a function as a prop?

`vi.fn()` creates a mock function in Vitest.

It allows us to check whether a function was called and what arguments were passed.

**Example from my ExpenseCard test:**

```typescript
const onDelete = vi.fn();

render(
  <ExpenseCard
    expense={mockExpense}
    onDelete={onDelete}
  />
);

await userEvent.click(
  screen.getByRole('button', { name: /delete/i })
);

expect(onDelete).toHaveBeenCalledWith(mockExpense.id);
```

**Why is it needed?**

The `ExpenseCard` component receives an `onDelete` function as a prop.

Using `vi.fn()`, I can verify that clicking the Delete button calls the function with the correct expense ID without actually deleting data.

---

### 3. Why must tests not make real API calls? How did you mock an API call in your tests?

Tests should avoid real API calls because:

- Network connections may fail.
- API responses may change.
- Tests become slower.
- Tests may accidentally modify real data.

**Mocking an API call:**

Vitest provides `vi.mock()` to replace a real API module with a fake implementation.

Example:

```typescript
vi.mock('../api/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));
```

We can return sample data using:

```typescript
vi.mocked(api.get).mockResolvedValueOnce({
  data: mockExpenses,
});
```

This allows us to test API-related functionality without connecting to a real backend.

**In my Task 23 project:**

My Expense Tracker primarily uses localStorage for storing expenses, so I tested localStorage functionality without requiring real API calls.

The API mocking code above demonstrates how I would test a component that uses a backend API.

---

### 4. What does vi.useFakeTimers() do in your useDebounce test, and why is it needed?

`vi.useFakeTimers()` replaces real JavaScript timers with controlled timers during testing.

My `useDebounce` hook waits 300 milliseconds before updating a value.

Instead of waiting for real time, I can simulate the delay.

**Example:**

```typescript
vi.useFakeTimers();

const { result, rerender } = renderHook(
  ({ value }) => useDebounce(value, 300),
  {
    initialProps: { value: 'hello' },
  }
);

rerender({ value: 'world' });

expect(result.current).toBe('hello');

act(() => {
  vi.advanceTimersByTime(300);
});

expect(result.current).toBe('world');

vi.useRealTimers();
```

**Why is it needed?**

Fake timers make tests faster and more predictable.

They allow us to verify that the debounced value changes only after the specified delay.

`vi.useRealTimers()` restores normal timer behaviour after testing.

---

## Final Project Results

| Test Details | Result |
|---|---|
| Testing Framework | Vitest |
| Component Testing | React Testing Library |
| Total Test Files | 7 |
| Total Tests | 36 |
| Passed Tests | 36 |
| Failed Tests | 0 |
| Statement Coverage | 91.95% |
| Branch Coverage | 91.04% |
| Function Coverage | 73.91% |
| Line Coverage | 91.95% |

### Conclusion

I successfully implemented unit tests, component tests, custom hook tests, and an integration test for my React TypeScript Expense Tracker application.

I learned how to use Vitest, React Testing Library, mock functions, fake timers, form validation tests, and coverage reports.

All 36 tests passed successfully, with 91.95% statement coverage.
