import reducer, { clear, selectToken } from "./tokenSlice";
import { test, expect } from "vitest";
import { T18_ADDRESS } from "../../../../contstants/addresses";

test("should return initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual({
    value: null,
  });
});

test("should set token value (address)", () => {
  expect(reducer({ value: null }, selectToken(T18_ADDRESS))).toEqual({
    value: T18_ADDRESS,
  });
});

test("should clear selected token value (address)", () => {
  expect(reducer({ value: T18_ADDRESS }, clear())).toEqual({ value: null });
});
