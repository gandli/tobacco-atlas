import "@testing-library/jest-dom";
import { createElement } from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const {
      fill: _fill,
      priority: _priority,
      placeholder: _placeholder,
      blurDataURL: _blurDataURL,
      unoptimized: _unoptimized,
      quality: _quality,
      loader: _loader,
      ...rest
    } = props;

    return createElement("img", rest);
  },
}));

type IntersectionEntryInit = {
  isIntersecting?: boolean;
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

class MockIntersectionObserver {
  static instance: MockIntersectionObserver | null = null;

  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instance = this;
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  trigger({ isIntersecting = true }: IntersectionEntryInit = {}) {
    this.callback(
      [
        {
          isIntersecting,
          target: document.createElement("div"),
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRatio: isIntersecting ? 1 : 0,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(globalThis, "__triggerIntersection", {
  writable: true,
  value: (isIntersecting = true) => {
    MockIntersectionObserver.instance?.trigger({ isIntersecting });
  },
});
