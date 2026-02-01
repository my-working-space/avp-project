import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the AVP Creator title', () => {
    render(<App />);
    expect(screen.getByText('AVP Creator')).toBeInTheDocument();
  });

  it('shows coming soon message', () => {
    render(<App />);
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('displays feature preview icons', () => {
    render(<App />);
    expect(screen.getByText('Audio Generation')).toBeInTheDocument();
    expect(screen.getByText('Media Control')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
  });
});
