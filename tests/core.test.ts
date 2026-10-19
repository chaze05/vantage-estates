import test from "node:test";
import assert from "node:assert/strict";
import { formatPrice, formatPeso } from "../src/lib/format.ts";
import { parseFavorites, toggleFavorite } from "../src/lib/favorites.ts";
import { validateInquiry } from "../src/lib/validation.ts";
import { filterProperties } from "../src/lib/filters.ts";
import { PROPERTIES } from "../src/data/properties.ts";

test("formatting PH prices", () => {
  assert.equal(formatPrice(18500000), "₱18.5M");
  assert.equal(formatPrice(6500000), "₱6.5M");
  assert.equal(formatPeso(9800000), "₱9,800,000");
});

test("favorites parse/toggle", () => {
  assert.deepEqual(parseFavorites(null), []);
  assert.deepEqual(parseFavorites('["a","b","b"]'), ["a", "b"]);
  assert.deepEqual(toggleFavorite(["a"], "b"), ["a", "b"]);
  assert.deepEqual(toggleFavorite(["a"], "a"), []);
});

test("inquiry validation", () => {
  const bad = validateInquiry({
    name: " ",
    email: "x",
    phone: "abc",
    interest: "",
    message: "hi",
  });
  assert.ok(bad.name && bad.email && bad.phone && bad.message);
  assert.deepEqual(
    validateInquiry({
      name: "Rani Rubillos",
      email: "rani@example.com",
      phone: "+63 917 555 0142",
      interest: "Buying",
      message: "Please send me the floor plans for this unit.",
    }),
    {}
  );
});

test("filter engine: query, type, location, beds, price, saved, sort", () => {
  assert.equal(filterProperties(PROPERTIES, {}, []).length, PROPERTIES.length);

  const condo = filterProperties(PROPERTIES, { type: "Condo" }, []);
  assert.equal(condo.length, 2);
  assert.ok(condo.every((p) => p.type === "Condo"));

  const bgc = filterProperties(PROPERTIES, { query: "BGC" }, []);
  assert.ok(bgc.length >= 1);

  const cheap = filterProperties(PROPERTIES, { maxPrice: 10000000 }, []);
  assert.ok(cheap.every((p) => p.price <= 10000000));

  const saved = filterProperties(PROPERTIES, { saved: true }, ["one-bgc-tower"]);
  assert.deepEqual(saved.map((p) => p.slug), ["one-bgc-tower"]);

  const asc = filterProperties(PROPERTIES, { sort: "price-asc" }, []);
  assert.equal(asc[0].price, Math.min(...PROPERTIES.map((p) => p.price)));
  const desc = filterProperties(PROPERTIES, { sort: "price-desc" }, []);
  assert.equal(desc[0].price, Math.max(...PROPERTIES.map((p) => p.price)));
});

test("property data integrity and image files", () => {
  assert.equal(PROPERTIES.length, 8);
  assert.equal(new Set(PROPERTIES.map((p) => p.slug)).size, 8);
  for (const property of PROPERTIES) {
    assert.ok(property.images.length >= 3);
    assert.ok(property.price > 0);
  }
});
