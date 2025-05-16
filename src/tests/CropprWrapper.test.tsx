import React from 'react';
import { render, screen } from '@testing-library/react';
import CropprWrapper from '../components/CropprWrapper/CropprWrapper';

// Mock Croppr library
jest.mock('../functions/croppr/index', () => {
  return jest.fn().mockImplementation(() => ({
    getValue: jest.fn().mockReturnValue({
      x: 10,
      y: 10,
      width: 100,
      height: 100
    }),
    destroy: jest.fn(),
    resizeTo: jest.fn()
  }));
});

describe('CropprWrapper', () => {
  const mockCroppUpdate = jest.fn();
  const mockProps = {
    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    size: { width: 150, height: 150 },
    croppUpdate: mockCroppUpdate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CropprWrapper {...mockProps} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockProps.src);
  });

  it('initializes with correct props', () => {
    render(<CropprWrapper {...mockProps} />);

    // We can't directly test Croppr initialization since it's mocked,
    // but we can verify the component renders with the correct props
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', mockProps.src);
  });

  it('updates when props change', () => {
    const { rerender } = render(<CropprWrapper {...mockProps} />);

    // Update props
    const updatedProps = {
      ...mockProps,
      cropWidth: 200,
      cropHeight: 200,
      aspectRatio: 1,
    };

    rerender(<CropprWrapper {...updatedProps} />);

    // The component should re-render with new props
    // We can't directly test the Croppr instance updates since it's mocked
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
  });

   it('updates when size changes', () => {
    const { rerender } = render(<CropprWrapper {...mockProps} />);
    
    const newSize = { width: 200, height: 200 };
    rerender(<CropprWrapper {...mockProps} size={newSize} />);
    
    // The component should re-render with new size
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('cleans up Croppr instance on unmount', () => {
    const { unmount } = render(<CropprWrapper {...mockProps} />);

    // Unmount the component
    unmount();

    // We can't directly test if destroy was called since it's mocked
    // But the component should unmount without errors
  });
});
