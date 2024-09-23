import { describe, it, expect } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

import { optimizeSetState } from "./optimize-set-state";

describe("optimizeSetState", () => {
  let state = { value_1: 1, value_2: 2 };
  const setState = jest.fn((newState: typeof state) => {
    state = newState;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должен не вызывать setState, если передано старое значение", () => {
    const optimizedSetState = optimizeSetState(setState, state);
    optimizedSetState({ value_1: 1, value_2: 2 });
    expect(setState).toBeCalledTimes(0);
  });

  it("должен вызывать setState, если передано новое значение", () => {
    const optimizedSetState = optimizeSetState(setState, state);
    optimizedSetState({ value_1: 2, value_2: 4 });
    expect(setState).toBeCalledTimes(1);
  });
});
