import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CollectionPageFrame from "./CollectionPageFrame";

describe("CollectionPageFrame", () => {
  it("uses the standard content width by default", () => {
    render(<CollectionPageFrame>content</CollectionPageFrame>);

    expect(screen.getByTestId("page-frame")).toHaveClass("max-w-[1200px]");
  });

  it("supports a reading width variant", () => {
    render(<CollectionPageFrame size="reading">content</CollectionPageFrame>);

    expect(screen.getByTestId("page-frame")).toHaveClass("max-w-3xl");
  });
});
