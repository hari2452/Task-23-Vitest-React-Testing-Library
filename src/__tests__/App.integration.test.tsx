import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

it('adds an expense and displays its card', async () => {
  const user = userEvent.setup();

  // Render the application
  render(<App />);

  // Enter expense title
  await user.type(
    screen.getByPlaceholderText('Title'),
    'Notebook'
  );

  // Enter expense amount
  await user.type(
    screen.getByPlaceholderText('Amount'),
    '120'
  );

  // Submit the expense
  await user.click(
    screen.getByRole('button', { name: /add expense/i })
  );

  // Verify expense title appears
  expect(
    screen.getByText('Notebook')
  ).toBeInTheDocument();

  // Verify expense amount appears
  // Multiple elements may display the same amount
  const amounts = screen.getAllByText('₹120.00');

  expect(amounts.length).toBeGreaterThan(0);
});