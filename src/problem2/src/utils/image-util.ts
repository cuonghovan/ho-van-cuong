export const getImageUrl = (icon: string) => {
  return new URL(`../assets/tokens/${icon}`, import.meta.url).href;
};