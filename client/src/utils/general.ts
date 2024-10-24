export const merge = (
  ...v: Array<string | null | undefined | number | boolean>
) => {
  return v.filter(Boolean).join(" ");
};
