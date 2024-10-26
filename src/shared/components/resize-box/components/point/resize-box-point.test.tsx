import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { ResizeBoxPoint } from "./resize-box-point";
import { ESide } from "@/shared/enums";
import {
  resizeBoxPointSideClasses,
  resizeBoxPointTranslateClasses,
} from "./classes";

describe("ResizeBoxPoint", () => {
  it("должен отображать, то что передается в качестве children при всех значениях side", () => {
    const sides = Object.values(ESide);
    render(
      sides.map((side) => (
        <ResizeBoxPoint key={side} side={side}>
          <button>Top Point</button>
        </ResizeBoxPoint>
      ))
    );
    const buttonElements = screen.queryAllByRole("button");
    buttonElements.forEach((buttonElement) => {
      expect(buttonElement).toBeInTheDocument();
    });
  });

  it("должен выставлять верные классы children, относительно side", () => {
    const sides = Object.values(ESide);
    render(
      sides.map((side) => (
        <ResizeBoxPoint key={side} side={side}>
          <button>Top Point</button>
        </ResizeBoxPoint>
      ))
    );
    const buttonElements = screen.getAllByRole("button");
    buttonElements.forEach((buttonElement, index) => {
      expect(buttonElement).toHaveClass(
        resizeBoxPointSideClasses[sides[index]],
        resizeBoxPointTranslateClasses[sides[index]]
      );
    });
  });
});
