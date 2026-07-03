// Tarif pengiriman berdasarkan kecamatan (dapat diperbarui via admin)
// Format: { kecamatan: { nama, kota, tarif_cod, tarif_transfer } }

export const SHIPPING_RATES = {
  medan_kota: {
    nama: "Medan Kota",
    kota: "Medan",
    tarif_cod: 10000,
    tarif_transfer: 8000,
  },
  medan_deli: {
    nama: "Medan Deli",
    kota: "Medan",
    tarif_cod: 12000,
    tarif_transfer: 10000,
  },
  medan_baru: {
    nama: "Medan Baru",
    kota: "Medan",
    tarif_cod: 12000,
    tarif_transfer: 10000,
  },
  medan_selayang: {
    nama: "Medan Selayang",
    kota: "Medan",
    tarif_cod: 12000,
    tarif_transfer: 10000,
  },
  medan_area: {
    nama: "Medan Area",
    kota: "Medan",
    tarif_cod: 12000,
    tarif_transfer: 10000,
  },
  pulo_brayan: {
    nama: "Pulo Brayan",
    kota: "Medan",
    tarif_cod: 14000,
    tarif_transfer: 12000,
  },
  sunggal: {
    nama: "Sunggal",
    kota: "Medan",
    tarif_cod: 15000,
    tarif_transfer: 13000,
  },
  tuntungan: {
    nama: "Tuntungan",
    kota: "Medan",
    tarif_cod: 15000,
    tarif_transfer: 13000,
  },
  medan_timur: {
    nama: "Medan Timur",
    kota: "Medan",
    tarif_cod: 12000,
    tarif_transfer: 10000,
  },
  medan_satria: {
    nama: "Medan Satria",
    kota: "Medan",
    tarif_cod: 13000,
    tarif_transfer: 11000,
  },
  amplas: {
    nama: "Amplas",
    kota: "Medan",
    tarif_cod: 14000,
    tarif_transfer: 12000,
  },
  belawan: {
    nama: "Belawan",
    kota: "Medan",
    tarif_cod: 16000,
    tarif_transfer: 14000,
  },
};

export const DISTRICTS = Object.entries(SHIPPING_RATES).map(([key, value]) => ({
  key,
  label: `${value.nama} (${value.kota})`,
  ...value,
}));

export const getShippingCost = (districtKey, paymentMethod = "transfer") => {
  const rate = SHIPPING_RATES[districtKey];
  if (!rate) return 0;
  return paymentMethod === "cod" ? rate.tarif_cod : rate.tarif_transfer;
};
