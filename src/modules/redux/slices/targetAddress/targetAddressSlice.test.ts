import reducer, { setTargetAddress } from "./targetAddressSlice";
import { test, expect } from "vitest";

test("should return initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual({
    value: "",
    isValid: false,
  });
});

const prevState = {
  value: "",
  isValid: false,
};

test("should update targetAddress value and be valid", () => {
  const newTargetAddress = "0xf0A1982603d0b0Ed388994ad0D5BC76f98FFBD92";
  expect(reducer(prevState, setTargetAddress(newTargetAddress))).toEqual({
    value: newTargetAddress,
    isValid: true,
  });
});

test("should update targetAddress value and be invalid", () => {
  const newTargetAddress = "0xasdfasdf";
  expect(reducer(prevState, setTargetAddress(newTargetAddress))).toEqual({
    value: newTargetAddress,
    isValid: false,
  });
});
