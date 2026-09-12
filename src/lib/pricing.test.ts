import { describe, expect, it } from "vitest";
import { calculatePrice } from "./pricing";

describe("calculatePrice", () => {
  it("combines material, energy, labor, failure allowance and margin", () => {
    expect(calculatePrice({ materialGrams: 100, materialPricePerKg: 100, printHours: 10, printerWatts: 200, electricityPricePerKwh: 1, laborCost: 8, failureRatePercent: 10, marginPercent: 25 })).toEqual({ materialCost: 10, energyCost: 2, subtotal: 22.22, finalPrice: 27.78 });
  });
  it("rejects negative costs", () => {
    expect(() => calculatePrice({ materialGrams: -1, materialPricePerKg: 100, printHours: 1, printerWatts: 100, electricityPricePerKwh: 1, laborCost: 0, failureRatePercent: 0, marginPercent: 0 })).toThrow(RangeError);
  });
  it("rejects a failure rate that would divide by zero", () => {
    expect(() => calculatePrice({ materialGrams: 1, materialPricePerKg: 1, printHours: 1, printerWatts: 1, electricityPricePerKwh: 1, laborCost: 0, failureRatePercent: 100, marginPercent: 0 })).toThrow(RangeError);
  });
});
