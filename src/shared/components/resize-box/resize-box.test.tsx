import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { ResizeBox } from "./resize-box";

describe("ResizeBox", () => {
  beforeEach(() => {
    render(
      <ResizeBox
        pointElements={{
          top: <button>Top Point</button>,
          right: <button>Right Point</button>,
          bottom: <button>Bottom Point</button>,
          left: <button>Left Point</button>,
        }}
      >
        <div data-testid="riseze-element">Test Riseze Element</div>
      </ResizeBox>
    );
  });

  it("должен отображать children", () => {
    const resizeElement = screen.queryByTestId("riseze-element");
    expect(resizeElement).toBeInTheDocument();
  });

  it("должен отображать все переданные точки внутри children", () => {
    const resizeElement = screen.getByTestId("riseze-element");
    const resizeElementPoints = resizeElement.getElementsByTagName("button");
    for (const resizeElementPoint of resizeElementPoints) {
      expect(resizeElementPoint).toBeInTheDocument();
    }
  });

  it("должен уставнавливать children верные стили размера", () => {
    const resizeElement = screen.getByTestId("riseze-element");
    const resizeElementRect = resizeElement.getBoundingClientRect();
    const resizeElementStyle = resizeElement.style;
    expect(resizeElementStyle).toHaveProperty(
      "height",
      `${resizeElementRect.height}px`
    );
    expect(resizeElementStyle).toHaveProperty(
      "width",
      `${resizeElementRect.width}px`
    );
  });
});
