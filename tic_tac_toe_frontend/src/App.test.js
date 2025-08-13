import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders title and initial status', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /tic tac toe/i })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent(/Player X's turn/i);
});

test('allows a move and toggles player turn', () => {
  render(<App />);
  const cell1 = screen.getByLabelText(/cell 1/i);
  fireEvent.click(cell1);
  expect(cell1).toHaveTextContent('X');
  expect(screen.getByRole('status')).toHaveTextContent(/Player O's turn/i);
});

test('restart button resets the board', () => {
  render(<App />);
  const cell1 = screen.getByLabelText(/cell 1/i);
  fireEvent.click(cell1); // X
  expect(cell1).toHaveTextContent('X');

  const restart = screen.getByRole('button', { name: /restart game/i });
  fireEvent.click(restart);

  expect(cell1).toHaveTextContent('');
  expect(screen.getByRole('status')).toHaveTextContent(/Player X's turn/i);
});
