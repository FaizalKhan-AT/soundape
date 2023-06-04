export const formatNumber = (num: number) => {
  return Intl.NumberFormat("en", { notation: "compact" }).format(num);
};
