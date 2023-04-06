export const bgcolors = (ctx: any) => {
  if (ctx > 2) {
    return "#ff2616";
  }
  if (ctx > 1) {
    return "#ff928a";
  }
  if (ctx > 0) {
    return "#ffd3d0";
  }
  if (ctx === 0) {
    return "#999";
  }
  if (ctx < -3) {
    return "#0076ec";
  }
  if (ctx < -2) {
    return "#518bf5";
  }
  if (ctx < -1) {
    return "#d6ebff";
  }
  if (ctx < 0) {
    return "#e8f4ff";
  }
};
