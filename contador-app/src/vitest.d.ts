/// <reference types="vite/client" />
/// <reference types="vitest" />

import '@testing-library/jest-dom';

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveClass(className: string): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toHaveAttribute(attr: string, value?: string): R;
  toHaveTextContent(text: string | RegExp): R;
  toBeChecked(): R;
  toBeVisible(): R;
  toContainElement(element: HTMLElement | null): R;
  toHaveValue(value: string | string[] | number): R;
  toHaveFocus(): R;
}

declare global {
  namespace Vi {
    // @ts-ignore
    interface Assertion extends CustomMatchers {}
    // @ts-ignore
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
} 