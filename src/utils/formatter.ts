export const dateFormatter = new Intl.DateTimeFormat("pt-Br");

export const priceFormatter = new Intl.NumberFormat("pt-Br", {
  style: "currency",
  currency: "BRL",
});
