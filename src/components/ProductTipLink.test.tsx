import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { ProductTipLink } from './ProductTipLink';

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
}

describe('ProductTipLink', () => {
  it('should show authenticity guide for cigarette products', () => {
    renderWithI18n(
      <ProductTipLink 
        productType="烤烟型"
        tobaccoType="烤烟型"
      />
    );

    expect(screen.getByText(/真伪鉴别指南|Authenticity Verification/)).toBeInTheDocument();
  });

  it('should show preservation tips for cigar products', () => {
    renderWithI18n(
      <ProductTipLink 
        productType="雪茄"
        tobaccoType="雪茄"
      />
    );

    expect(screen.getByText(/雪茄保存贴士|Cigar Preservation/)).toBeInTheDocument();
  });

  it('should show preservation tips for cigar products (Chinese)', () => {
    renderWithI18n(
      <ProductTipLink 
        productType="雪茄型"
        tobaccoType="雪茄型"
      />
    );

    expect(screen.getByText(/雪茄保存贴士|Cigar Preservation/)).toBeInTheDocument();
  });

  it('should show authenticity guide by default', () => {
    renderWithI18n(
      <ProductTipLink />
    );

    expect(screen.getByText(/真伪鉴别指南|Authenticity Verification/)).toBeInTheDocument();
  });

  it('should have correct link for authenticity guide', () => {
    renderWithI18n(
      <ProductTipLink 
        productType="烤烟型"
      />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/authenticity-guide');
  });

  it('should have correct link for preservation tips', () => {
    renderWithI18n(
      <ProductTipLink 
        productType="雪茄"
      />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/cigar-preservation');
  });

  it('should display shield icon for authenticity guide', () => {
    renderWithI18n(
      <ProductTipLink 
        productType="烤烟型"
      />
    );

    // Check for shield-related content
    expect(screen.getByText(/真伪鉴别指南|Authenticity Verification/)).toBeInTheDocument();
  });

  it('should display cigarette icon for preservation tips', () => {
    renderWithI18n(
      <ProductTipLink 
        productType="雪茄"
      />
    );

    // Check for cigar-related content
    expect(screen.getByText(/雪茄保存贴士|Cigar Preservation/)).toBeInTheDocument();
  });
});
