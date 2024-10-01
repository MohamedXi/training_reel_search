import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders the input field and button', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('calls onSearch with the correct query when the button is clicked', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('Inception');
  });

  it('calls onSearch with the correct query when Enter key is pressed', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSearchMock).toHaveBeenCalledWith('Inception');
  });

  it('does not call onSearch when other keys are pressed', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA' });

    expect(onSearchMock).not.toHaveBeenCalled();
  });
});
