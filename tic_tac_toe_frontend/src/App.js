import React, { useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * App
 * A modern, minimalistic Tic Tac Toe game for two players.
 * - Interactive 3x3 board
 * - Player turn indication
 * - Win/draw detection with highlighting of the winning line
 * - Restart game functionality
 */
function App() {
  // Game state: 9 cells initialized to null
  const [board, setBoard] = useState(Array(9).fill(null));
  // Current player: 'X' starts first
  const [currentPlayer, setCurrentPlayer] = useState('X');
  // Winner state: 'X', 'O' or null
  const [winner, setWinner] = useState(null);
  // Winning line indices if a player has won
  const [winningLine, setWinningLine] = useState([]);
  // Draw state
  const [isDraw, setIsDraw] = useState(false);

  // All possible winning combinations (by board indices)
  const WINNING_COMBINATIONS = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  // Check for a winner; returns { winner: 'X' | 'O' | null, line: number[] }
  const calculateWinner = (squares) => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: [] };
  };

  // Handle clicks on a board cell
  const handleCellClick = (index) => {
    // Ignore clicks if the cell is already filled or the game is over
    if (board[index] || winner) return;

    const nextBoard = board.slice();
    nextBoard[index] = currentPlayer;

    const { winner: foundWinner, line } = calculateWinner(nextBoard);

    setBoard(nextBoard);

    if (foundWinner) {
      setWinner(foundWinner);
      setWinningLine(line);
      setIsDraw(false);
    } else if (nextBoard.every((cell) => cell !== null)) {
      setIsDraw(true);
      setWinner(null);
      setWinningLine([]);
    } else {
      setCurrentPlayer((p) => (p === 'X' ? 'O' : 'X'));
    }
  };

  // PUBLIC_INTERFACE
  // Reset the game to its initial state
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine([]);
    setIsDraw(false);
  };

  // Status message
  let statusMessage = `Player ${currentPlayer}'s turn`;
  if (winner) {
    statusMessage = `Player ${winner} wins!`;
  } else if (isDraw) {
    statusMessage = `It's a draw.`;
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Tic Tac Toe</h1>
        <p className="subtitle">A classic, minimalistic two-player game</p>
      </header>

      <main className="main">
        <div className="board" role="grid" aria-label="Tic Tac Toe board">
          {board.map((value, idx) => {
            const isWinningCell = winningLine.includes(idx);
            const cellClasses = [
              'cell',
              value === 'X' ? 'cell--x' : '',
              value === 'O' ? 'cell--o' : '',
              isWinningCell ? 'cell--win' : '',
            ]
              .filter(Boolean)
              .join(' ');

            const ariaLabel = value
              ? `Cell ${idx + 1}, ${value}`
              : `Cell ${idx + 1}, place ${currentPlayer}`;

            return (
              <button
                key={idx}
                type="button"
                className={cellClasses}
                onClick={() => handleCellClick(idx)}
                aria-label={ariaLabel}
                aria-pressed={value ? 'true' : 'false'}
                disabled={Boolean(value) || Boolean(winner)}
              >
                <span className="cell__value">{value}</span>
              </button>
            );
          })}
        </div>

        <div className="panel">
          <div className={`status ${winner ? 'status--winner' : isDraw ? 'status--draw' : ''}`} role="status" aria-live="polite">
            {statusMessage}
          </div>
          <button type="button" className="btn btn-restart" onClick={restartGame} aria-label="Restart game">
            Restart
          </button>
        </div>
      </main>

      <footer className="footer">
        <small className="note">Primary: #1976D2 · Secondary: #43A047 · Accent: #FFEB3B</small>
      </footer>
    </div>
  );
}

export default App;
