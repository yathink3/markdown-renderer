import React from 'react';
import { render, screen } from '@testing-library/react';
import MarkdownRenderer  from '../src/MarkdownRenderer';
import { describe, it, expect } from 'vitest';

describe('MarkdownRenderer', () => {
  it('renders headings and inline styles', () => {
    render(<MarkdownRenderer content="# Hello **World**" />, {});
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World');
    expect(screen.getByText('World').tagName).toBe('B');
  });

  it('renders a link and image', () => {
    render(<MarkdownRenderer content="[Google](https://google.com)\n![Alt](img.png)" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://google.com');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'img.png');
  });

  it('renders code blocks', () => {
    render(<MarkdownRenderer content="```\nconst a = 1;\n```" />);
    expect(screen.getByText(/const a/)).toBeInTheDocument();
  });
});
