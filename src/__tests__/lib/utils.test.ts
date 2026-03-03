import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn()', () => {
  it('joins multiple string arguments with a space', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('returns a single string unchanged', () => {
    expect(cn('foo')).toBe('foo');
  });

  it('filters out undefined values', () => {
    expect(cn('a', undefined, 'b')).toBe('a b');
  });

  it('filters out null values', () => {
    expect(cn('a', null, 'b')).toBe('a b');
  });

  it('filters out false values', () => {
    expect(cn('a', false, 'b')).toBe('a b');
  });

  it('filters out the number 0', () => {
    expect(cn('a', 0, 'b')).toBe('a b');
  });

  it('filters out empty strings', () => {
    expect(cn('a', '', 'b')).toBe('a b');
  });

  it('returns empty string when called with no arguments', () => {
    expect(cn()).toBe('');
  });

  it('returns empty string when all inputs are falsy', () => {
    expect(cn(undefined, null, false, 0, '')).toBe('');
  });

  it('handles Tailwind class names correctly', () => {
    expect(cn('text-sm', 'font-bold', 'text-gold')).toBe('text-sm font-bold text-gold');
  });

  it('handles conditional class patterns (truthy condition)', () => {
    const isActive = true;
    expect(cn('base-class', isActive && 'active-class')).toBe('base-class active-class');
  });

  it('handles conditional class patterns (falsy condition)', () => {
    const isActive = false;
    expect(cn('base-class', isActive && 'active-class')).toBe('base-class');
  });
});
