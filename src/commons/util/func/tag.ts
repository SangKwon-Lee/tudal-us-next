export const tag = (tag?: string) => {
  let newTag = tag?.trim().split(",");
  newTag = newTag
    ?.sort((a, b) => a.length - b.length)
    .slice(0, 2)
    .map((data) => `#${data.trim()} `);
  return newTag;
};
