import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TabContainer, { TabItem } from '../components/Tab/Tab';

describe('TabContainer and TabItem', () => {
  it('renders without crashing', () => {
    render(
      <TabContainer data-testid='tab-container'>
        <TabItem name='Tab 1'>Content 1</TabItem>
        <TabItem name='Tab 2'>Content 2</TabItem>
      </TabContainer>
    );

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).toBeInTheDocument();
  });

  it('changes active tab when clicked', () => {
    render(
      <TabContainer lazy>
        <TabItem name='Tab 1'>Content 1</TabItem>
        <TabItem name='Tab 2'>Content 2</TabItem>
      </TabContainer>
    );

    // Initially, Tab 1 should be active
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.queryByText('Content 2')).toBe(null);

    // Click on Tab 2
    fireEvent.click(screen.getByText('Tab 2'));

    // Now Tab 2 should be active
    expect(screen.queryByText('Content 1')).toBe(null);
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('respects activeIndex prop', () => {
    render(
      <TabContainer lazy activeIndex={1}>
        <TabItem name='Tab 1'>Content 1</TabItem>
        <TabItem name='Tab 2'>Content 2</TabItem>
      </TabContainer>
    );

    // Tab 2 should be active initially
    expect(screen.queryByText('Content 1')).toBe(null);
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('calls onTabChange when tab changes', () => {
    const mockOnTabChange = jest.fn();

    render(
      <TabContainer onTabChange={mockOnTabChange}>
        <TabItem name='Tab 1'>Content 1</TabItem>
        <TabItem name='Tab 2'>Content 2</TabItem>
      </TabContainer>
    );

    // Click on Tab 2
    fireEvent.click(screen.getByText('Tab 2'));

    // onTabChange should be called with new active tab index (1)
    expect(mockOnTabChange).toHaveBeenCalledWith(1);
  });

  it('disables tab when disabled prop is true', () => {
    render(
      <TabContainer lazy>
        <TabItem name='Tab 1'>Content 1</TabItem>
        <TabItem name='Tab 2' disabled={true}>
          Content 2
        </TabItem>
      </TabContainer>
    );

    // Tab 2 should be disabled
    const tab2Button = screen.getByText('Tab 2');
    expect(tab2Button).toBeDisabled();

    // Click on Tab 2 should not change the active tab
    fireEvent.click(tab2Button);

    // Tab 1 content should still be visible
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.queryByText('Content 2')).toBe(null);
  });

  it('applies custom styles based on props', () => {
    const customColor = '#FF0000';
    const customBgColor = '#EEEEEE';

    render(
      <TabContainer color={customColor} backgroundColor={customBgColor} indicatorStyle='button'>
        <TabItem name='Tab 1'>Content 1</TabItem>
        <TabItem name='Tab 2'>Content 2</TabItem>
      </TabContainer>
    );

    // Check that the header has the custom background color
    const header = screen.getByText('Tab 1').parentElement;
    expect(header).toHaveStyle(`background-color: ${customBgColor}`);

    // Check that the active tab has the custom color as background (for button style)
    const activeTab = screen.getByText('Tab 1').closest('button');
    expect(activeTab).toHaveStyle(`background-color: ${customColor}`);
  });
});
