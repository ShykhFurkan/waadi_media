import { test, describe } from 'node:test';
import assert from 'node:assert';
import { calculatePricingEstimate } from '../src/data/pricing.ts';

describe('Pricing Calculator Engine Tests', () => {
  test('returns zeros when no items are selected', () => {
    const result = calculatePricingEstimate([]);
    assert.strictEqual(result.selectedItems.length, 0);
    assert.strictEqual(result.oneTimeSubtotal, 0);
    assert.strictEqual(result.bundleSaving, 0);
    assert.strictEqual(result.oneTimeTotal, 0);
    assert.strictEqual(result.monthlyTotal, 0);
    assert.strictEqual(result.appliesDiscount, false);
  });

  test('calculates single one-time item without bundle discount', () => {
    // landing page: 5000 one-time
    const result = calculatePricingEstimate(['landing']);
    assert.strictEqual(result.selectedItems.length, 1);
    assert.strictEqual(result.oneTimeSubtotal, 5000);
    assert.strictEqual(result.bundleSaving, 0);
    assert.strictEqual(result.oneTimeTotal, 5000);
    assert.strictEqual(result.monthlyTotal, 0);
    assert.strictEqual(result.appliesDiscount, false);
  });

  test('calculates two one-time items without bundle discount', () => {
    // gbp: 2000, landing: 5000 (total = 7000)
    const result = calculatePricingEstimate(['gbp', 'landing']);
    assert.strictEqual(result.selectedItems.length, 2);
    assert.strictEqual(result.oneTimeSubtotal, 7000);
    assert.strictEqual(result.bundleSaving, 0);
    assert.strictEqual(result.oneTimeTotal, 7000);
    assert.strictEqual(result.monthlyTotal, 0);
    assert.strictEqual(result.appliesDiscount, false);
  });

  test('applies 10% bundle discount for exactly 3 one-time items', () => {
    // gbp: 2000, logo: 3500, landing: 5000
    // subtotal = 10500, 10% discount = 1050, total = 9450
    const result = calculatePricingEstimate(['gbp', 'logo', 'landing']);
    assert.strictEqual(result.selectedItems.length, 3);
    assert.strictEqual(result.oneTimeSubtotal, 10500);
    assert.strictEqual(result.bundleSaving, 1050);
    assert.strictEqual(result.oneTimeTotal, 9450);
    assert.strictEqual(result.monthlyTotal, 0);
    assert.strictEqual(result.appliesDiscount, true);
  });

  test('applies 10% bundle discount for 4+ one-time items', () => {
    // gbp: 2000, logo: 3500, landing: 5000, brand-kit: 15000
    // subtotal = 25500, 10% discount = 2550, total = 22950
    const result = calculatePricingEstimate(['gbp', 'logo', 'landing', 'brand-kit']);
    assert.strictEqual(result.selectedItems.length, 4);
    assert.strictEqual(result.oneTimeSubtotal, 25500);
    assert.strictEqual(result.bundleSaving, 2550);
    assert.strictEqual(result.oneTimeTotal, 22950);
    assert.strictEqual(result.monthlyTotal, 0);
    assert.strictEqual(result.appliesDiscount, true);
  });

  test('calculates monthly items without discounting them', () => {
    // local-seo: 5000/mo, meta-ads: 8000/mo, report: 3000/mo
    // monthlyTotal = 16000
    const result = calculatePricingEstimate(['local-seo', 'meta-ads', 'report']);
    assert.strictEqual(result.selectedItems.length, 3);
    assert.strictEqual(result.oneTimeSubtotal, 0);
    assert.strictEqual(result.bundleSaving, 0);
    assert.strictEqual(result.oneTimeTotal, 0);
    assert.strictEqual(result.monthlyTotal, 16000);
    // Bundle discount applies only to one-time items
    assert.strictEqual(result.appliesDiscount, false);
  });

  test('correctly calculates mixed one-time and monthly selections', () => {
    // One-time: business-site (15000), brand-kit (15000), chatbot (15000) -> 3 items, subtotal = 45000, 10% saving = 4500, total = 40500
    // Monthly: maintenance (1500), google-ads (10000) -> monthlyTotal = 11500
    const selected = ['business-site', 'brand-kit', 'chatbot', 'maintenance', 'google-ads'];
    const result = calculatePricingEstimate(selected);

    assert.strictEqual(result.selectedItems.length, 5);
    assert.strictEqual(result.oneTimeSubtotal, 45000);
    assert.strictEqual(result.bundleSaving, 4500);
    assert.strictEqual(result.oneTimeTotal, 40500);
    assert.strictEqual(result.monthlyTotal, 11500);
    assert.strictEqual(result.appliesDiscount, true);
  });

  test('safely ignores nonexistent or invalid item IDs', () => {
    const result = calculatePricingEstimate(['landing', 'invalid-id-xyz']);
    assert.strictEqual(result.selectedItems.length, 1);
    assert.strictEqual(result.oneTimeTotal, 5000);
  });
});
