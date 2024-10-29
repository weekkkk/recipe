import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import { ResizeBoxControl } from "./resize-box.control";
import { ESide } from "@/shared/enums";
import {
  resizeBoxControlSideClasses,
  resizeBoxControlTranslateClasses,
} from "./classes";

describe("ResizeBoxControl", () => {
  it("должен отображать, то что передается в качестве children при всех значениях side", () => {
    const sides = Object.values(ESide);
    render(
      sides.map((side) => (
        <ResizeBoxControl key={side} side={side}>
          <button>Top Point</button>
        </ResizeBoxControl>
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
        <ResizeBoxControl key={side} side={side}>
          <button>Top Point</button>
        </ResizeBoxControl>
      ))
    );
    const buttonElements = screen.getAllByRole("button");
    buttonElements.forEach((buttonElement, index) => {
      expect(buttonElement).toHaveClass(
        resizeBoxControlSideClasses[sides[index]],
        resizeBoxControlTranslateClasses[sides[index]]
      );
    });
  });
});
