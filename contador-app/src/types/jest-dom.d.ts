import '@testing-library/jest-dom';

// Dummy export to make TypeScript treat this as a module
export {};

declare global {
  namespace Vi {
    interface Assertion {
      toBeInTheDocument(): void;
      toHaveClass(className: string): void;
      toBeDisabled(): void;
      toBeEnabled(): void;
      toHaveAttribute(attr: string, value?: string): void;
      toHaveTextContent(text: string | RegExp): void;
      toBeChecked(): void;
      toBeVisible(): void;
      toContainElement(element: HTMLElement | null): void;
      toHaveValue(value: string | string[] | number): void;
      toHaveFocus(): void;
    }
  }
} 