export const pageview = (url: string) => {
  if (typeof window !== "undefined") {
    //@ts-ignore
    window.gtag("config", "G-P6956RH3Z6", {
      page_location: url,
    });
  }
};

// log specific events happening.
export const event = ({ action, params }: any) => {
  if (typeof window !== "undefined") {
    //@ts-ignore
    window.gtag("event", action, params);
  }
};
