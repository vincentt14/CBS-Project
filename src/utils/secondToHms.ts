export const secondToHms = (data: number) => {
  data = Number(data);

  const h = Math.floor(data / 3600);
  const m = Math.floor((data % 3600) / 60);

  const hDisplay = h > 0 ? h + "h " : "";
  const mDisplay = m > 0 ? m + "m" : "";

  return hDisplay + mDisplay;
};
