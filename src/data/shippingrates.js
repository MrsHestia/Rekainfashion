export const shippingRates = {
  "Medan Kota": 10000,
  "Medan Baru": 10000,
  "Medan Johor": 12000,
  "Medan Denai": 15000,
  "Medan Helvetia": 15000,
  "Medan Sunggal": 18000,
  "Medan Tembung": 18000,
  "Percut Sei Tuan": 20000,
  "Binjai": 25000,
  "Deli Serdang": 25000
};

export const getShippingCost = (district) =>
  shippingRates[district] || 25000;
