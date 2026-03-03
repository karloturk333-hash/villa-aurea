/** Merge class names, filtering out falsy values. */
export function cn(...inputs: (string | undefined | null | false | 0)[]): string {
  return inputs.filter((x): x is string => typeof x === 'string' && x.length > 0).join(' ');
}
