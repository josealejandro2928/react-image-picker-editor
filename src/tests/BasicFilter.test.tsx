import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicFilter from '../components/BasicFilters/BasicFilter';

describe('BasicFilter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  const mockLabels = {
    Contrast: 'Contrast',
    Brightness: 'Brightness',
    Grayscale: 'Grayscale',
    Saturate: 'Saturate',
    Sepia: 'Sepia',
    Blur: 'Blur',
    'Noise Reduction': 'Noise Reduction',
  };

  const mockInitialState = {
    contrast: 1,
    blur: 0,
    brightness: 1,
    grayscale: 0,
    invert: 0,
    saturate: 1,
    noiseReduction: 0,
    sepia: 0,
  };

  it('renders without crashing', () => {
    render(
      <BasicFilter
        labels={mockLabels}
        color='#000000'
        initialState={mockInitialState}
        changeFilter={() => {}}
      />
    );
    expect(screen.getByText(mockLabels.Contrast)).toBeInTheDocument();
    expect(screen.getByText(mockLabels.Brightness)).toBeInTheDocument();
    expect(screen.getByText(mockLabels.Grayscale)).toBeInTheDocument();
    expect(screen.getByText(mockLabels.Saturate)).toBeInTheDocument();
    expect(screen.getByText(mockLabels.Sepia)).toBeInTheDocument();
    expect(screen.getByText(mockLabels.Blur)).toBeInTheDocument();
    expect(screen.getByTestId('contrast')).toBeInTheDocument();
    expect(screen.getByTestId('contrast-value')).toHaveTextContent('1.00');

    expect(screen.getByTestId('brightness')).toBeInTheDocument(); // Brightness
    expect(screen.getByTestId('brightness-value')).toHaveTextContent('1.00');
    expect(screen.getByTestId('grayscale')).toBeInTheDocument();
    expect(screen.getByTestId('grayscale-value')).toHaveTextContent('1.00');
  });

  it('calls changeFilter when a filter value changes', () => {
    const mockChangeFilter = jest.fn();

    render(
      <BasicFilter
        labels={mockLabels}
        color='#000000'
        initialState={mockInitialState}
        changeFilter={mockChangeFilter}
      />
    );

    // Get the contrast input and change its value
    const contrastInput = screen.getByTestId('contrast');

    // Simulate a change event
    fireEvent.change(contrastInput, { target: { value: '2' } });

    // Simulate blur to trigger the onInputChangedEnd callback
    fireEvent.blur(contrastInput);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check if changeFilter was called with the updated state
    expect(mockChangeFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        contrast: '2',
        blur: 0,
        brightness: 1,
        grayscale: 0,
        invert: 0,
        saturate: 1,
        noiseReduction: 0,
        sepia: 0,
      })
    );
  });

  it('updates state when initialState prop changes', () => {
    const { rerender } = render(
      <BasicFilter
        labels={mockLabels}
        color='#000000'
        initialState={mockInitialState}
        changeFilter={() => {}}
      />
    );

    // Initial state check
    expect(screen.getByTestId('contrast-value')).toHaveTextContent('1.00');

    // Update the initialState prop
    const updatedState = {
      ...mockInitialState,
      contrast: 2,
    };

    rerender(
      <BasicFilter
        labels={mockLabels}
        color='#000000'
        initialState={updatedState}
        changeFilter={() => {}}
      />
    );

    // Check if the component updated with the new state
    expect(screen.getByTestId('contrast-value')).toHaveTextContent('2.00');
  });
});
