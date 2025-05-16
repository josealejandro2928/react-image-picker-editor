import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input/Input';

describe('Input', () => {
  it('renders without crashing', () => {
    render(
      <Input 
        type="text" 
        value="test" 
        data-testid="test-input"
      />
    );
    
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.getByTestId('test-input')).toHaveValue('test');
  });

  it('calls onChangedValue when input value changes', () => {
    const mockOnChangedValue = jest.fn();
    
    render(
      <Input 
        type="text" 
        value="test" 
        data-testid="test-input"
        onChangedValue={mockOnChangedValue}
      />
    );
    
    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(mockOnChangedValue).toHaveBeenCalledWith('new value');
  });

  it('calls onInputChangedEnd when input loses focus', () => {
    const mockOnInputChangedEnd = jest.fn();
    
    render(
      <Input 
        type="text" 
        value="test" 
        data-testid="test-input"
        onInputChangedEnd={mockOnInputChangedEnd}
      />
    );
    
    const input = screen.getByTestId('test-input');
    fireEvent.blur(input);
    
    expect(mockOnInputChangedEnd).toHaveBeenCalledWith('test');
  });

  it('calls onInputChangedEnd when Enter key is pressed', () => {
    const mockOnInputChangedEnd = jest.fn();
    
    render(
      <Input 
        type="text" 
        value="test" 
        data-testid="test-input"
        onInputChangedEnd={mockOnInputChangedEnd}
      />
    );
    
    const input = screen.getByTestId('test-input');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnInputChangedEnd).toHaveBeenCalledWith('test');
  });

  it('calls onChangedDelayed after delay when value changes', () => {
    jest.useFakeTimers();
    const mockOnChangedDelayed = jest.fn();
    
    const { rerender } = render(
      <Input 
        type="text" 
        value="test" 
        data-testid="test-input"
        onChangedDelayed={mockOnChangedDelayed}
        delayMs={200}
      />
    );
    
    // First render doesn't trigger the callback due to mountRef check
    expect(mockOnChangedDelayed).not.toHaveBeenCalled();
    
    // Update the value prop
    rerender(
      <Input 
        type="text" 
        value="new value" 
        data-testid="test-input"
        onChangedDelayed={mockOnChangedDelayed}
        delayMs={200}
      />
    );
    
    // Change the input value
    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'changed value' } });
    
    // Timer hasn't elapsed yet
    expect(mockOnChangedDelayed).not.toHaveBeenCalled();
    
    // Fast-forward time
    jest.advanceTimersByTime(200);
    
    // Now the callback should have been called
    expect(mockOnChangedDelayed).toHaveBeenCalledWith('changed value');
    
    jest.useRealTimers();
  });

  it('handles checkbox input type correctly', () => {
    const mockOnChangedValue = jest.fn();
    
    render(
      <Input 
        type="checkbox" 
        checked={false}
        data-testid="test-checkbox"
        onChangedValue={mockOnChangedValue}
      />
    );
    
    const checkbox = screen.getByTestId('test-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnChangedValue).toHaveBeenCalledWith(true);
  });

  it('uses testID prop for data-testid attribute', () => {
    render(
      <Input 
        type="text" 
        value="test" 
        testID="custom-test-id"
      />
    );
    
    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });
});