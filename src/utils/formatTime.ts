export const formatTime = (data: Date): string => {
  return `${data.getHours() < 10 ? "0" + data.getHours() : data.getHours()}:${data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes()}`;
};
