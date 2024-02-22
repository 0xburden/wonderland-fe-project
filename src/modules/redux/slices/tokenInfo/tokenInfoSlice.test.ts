import reducer, { clear, setTokenInfo } from "./tokenInfoSlice";
import { test, expect } from "vitest";

test("should return initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual({ value: null });
});

const tokenInfo = {
  name: "Token18",
  symbol: "T18",
  decimals: 18,
};

test("should update tokenInfo to info provided (t18)", () => {
  expect(
    reducer(
      { value: null },
      setTokenInfo({
        ...tokenInfo,
      })
    )
  ).toEqual({
    value: tokenInfo,
  });
});

test("should clear tokenInfo from state", () => {
  expect(reducer({ value: tokenInfo }, clear())).toEqual({ value: null });
});
