import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditImage from '../components/EditImage/EditImage';

// Mock the child components
jest.mock('../components/BasicFilters/BasicFilter', () => {
  return {
    __esModule: true,
    default: jest.fn(({ labels, color, initialState, changeFilter }) => (
      <div data-testid='mock-basic-filter'>
        <button data-testid='mock-filter-button' onClick={() => changeFilter({ contrast: 2 })}>
          Change Filter
        </button>
      </div>
    )),
  };
});

jest.mock('../components/CropprWrapper/CropprWrapper', () => {
  return {
    __esModule: true,
    default: jest.fn(({ src, size, croppUpdate }) => (
      <div data-testid='mock-croppr'>Mock Croppr</div>
    )),
  };
});

jest.mock('../components/Tab/Tab', () => {
  const TabContainer = ({ children }: { children: any }) => (
    <div data-testid='mock-tab-container'>{children}</div>
  );

  TabContainer.displayName = 'TabContainer';

  const TabItem = ({ children }: { children: any }) => (
    <div data-testid='mock-tab-item'>{children}</div>
  );

  return {
    __esModule: true,
    default: TabContainer,
    TabItem,
  };
});

// Mock the image processing functions
jest.mock('../functions/image-processing', () => ({
  convertImageUsingCanvas: jest.fn().mockImplementation((src, changeHeight, state) =>
    Promise.resolve({
      state,
      imageUri: src,
    })
  ),
  dragElement: jest.fn(),
  saveState: jest.fn().mockImplementation((state, dataUri) => state),
}));

describe('EditImage', () => {
  const mockProps = {
    labels: {
      Basic: 'Basic',
      Filters: 'Filters',
      Quality: 'Quality',
      'aspect-ratio': 'Aspect Ratio',
      'Max dimensions': 'Max dimensions',
      'max-width(px)': 'Max Width',
      'max-height(px)': 'Max Height',
      Format: 'Format',
      Crop: 'Crop',
      'width(px)': 'Width',
      'height(px)': 'Height',
      'Confirm Crop': 'Confirm Crop',
      Save: 'Save',
    },
    image: 'data:image/png;base64,test',
    color: '#428CFF',
    initialState: {
      quality: 92,
      maxHeight: 1000,
      maxWidth: 1000,
      cropHeight: 150,
      cropWidth: 150,
      maintainAspectRatio: true,
      format: 'jpeg',
      arrayCopiedImages: [],
      originImageSrc: '',
      rotation: 0,
    },
    saveUpdates: jest.fn(),
    rtl: false,
    dark: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<EditImage {...mockProps} />);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('updates quality when quality slider changes', () => {
    render(<EditImage {...mockProps} />);
    const qualityInput = screen.getByRole('slider');
    fireEvent.change(qualityInput, { target: { value: '80' } });
    expect(qualityInput).toHaveValue('80');
  });

  it('toggles crop mode', () => {
    render(<EditImage {...mockProps} />);
    const cropCheckbox = screen.getByTestId('set-crop-checkbox');

    fireEvent.click(cropCheckbox);
    expect(cropCheckbox).toBeChecked();
    expect(screen.getByTestId('mock-croppr')).toBeInTheDocument();

    fireEvent.click(cropCheckbox);
    expect(cropCheckbox).not.toBeChecked();
  });

  it('handles save action', () => {
    render(<EditImage {...mockProps} />);
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(mockProps.saveUpdates).toHaveBeenCalled();
  });

  it('updates format when format is changed', () => {
    render(<EditImage {...mockProps} />);
    const formatSelect = screen.getByRole('combobox');
    fireEvent.change(formatSelect, { target: { value: 'png' } });
    expect(formatSelect).toHaveValue('png');
  });

  it('handles rotation', () => {
    render(<EditImage {...mockProps} />);
    const rotateLeftButton = screen.getByText('rotate_left').parentElement;
    const rotateRightButton = screen.getByText('rotate_right').parentElement;

    fireEvent.click(rotateLeftButton!);
    fireEvent.click(rotateRightButton!);

    // Verify the buttons are enabled when not in crop mode
    expect(rotateLeftButton).not.toBeDisabled();
    expect(rotateRightButton).not.toBeDisabled();
  });
});
