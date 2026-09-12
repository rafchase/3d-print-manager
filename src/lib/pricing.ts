export type PricingInput = {
  materialGrams: number;
  materialPricePerKg: number;
  printHours: number;
  printerWatts: number;
  electricityPricePerKwh: number;
  laborCost: number;
  failureRatePercent: number;
  marginPercent: number;
};

export type PricingResult = { materialCost: number; energyCost: number; subtotal: number; finalPrice: number };

function requireNonNegative(value: number, field: string) {
  if (!Number.isFinite(value) || value < 0) throw new RangeError(`${field} must be a finite non-negative number`);
}

export function calculatePrice(input: PricingInput): PricingResult {
  Object.entries(input).forEach(([field, value]) => requireNonNegative(value, field));
  if (input.failureRatePercent >= 100) throw new RangeError("failureRatePercent must be below 100");
  const materialCost = (input.materialGrams / 1000) * input.materialPricePerKg;
  const energyCost = (input.printerWatts / 1000) * input.printHours * input.electricityPricePerKwh;
  const baseCost = materialCost + energyCost + input.laborCost;
  const subtotal = baseCost / (1 - input.failureRatePercent / 100);
  const finalPrice = subtotal * (1 + input.marginPercent / 100);
  const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
  return { materialCost: round(materialCost), energyCost: round(energyCost), subtotal: round(subtotal), finalPrice: round(finalPrice) };
}
