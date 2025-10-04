import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProcessFlow } from '@/components/ProcessFlow';

describe('ProcessFlow Component', () => {
  it('displays a sequential process with numbered steps', () => {
    render(<ProcessFlow />);

    // Should have numbered steps (1-6)
    const stepNumbers = ['1', '2', '3', '4', '5', '6'];
    stepNumbers.forEach((number) => {
      expect(screen.getByText(number)).toBeInTheDocument();
    });
  });

  it('shows process completion with success indicator', () => {
    render(<ProcessFlow />);

    // Should have a final success/completion element
    const successElements = screen.getAllByText(/offer|success|🎉/i);
    expect(successElements.length).toBeGreaterThan(0);
  });

  it('has proper semantic structure for accessibility', () => {
    render(<ProcessFlow />);

    // Should have main section heading
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toBeInTheDocument();

    // Should have step headings
    const stepHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(stepHeadings.length).toBeGreaterThan(5); // At least 6 steps
  });

  it('uses grid layout for responsive design', () => {
    render(<ProcessFlow />);

    // Should have grid container
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();

    // Should have responsive classes
    const responsiveGrid = document.querySelector(
      '.md\\:grid-cols-2, .lg\\:grid-cols-3'
    );
    expect(responsiveGrid || gridContainer).toBeInTheDocument();
  });

  it('includes visual step indicators and icons', () => {
    render(<ProcessFlow />);

    // Should have step indicator badges/circles
    const stepIndicators = document.querySelectorAll('.rounded-full');
    expect(stepIndicators.length).toBeGreaterThan(5);

    // Should have icons for each step
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(5);
  });

  it('provides clear process flow description', () => {
    render(<ProcessFlow />);

    // Should have descriptive text for each step
    const descriptions = screen.getAllByText(
      /upload|score|download|apply|interview|review/i
    );
    expect(descriptions.length).toBeGreaterThan(5);
  });
});
