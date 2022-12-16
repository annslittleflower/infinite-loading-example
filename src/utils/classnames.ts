export const classNames = (classes: (string | undefined)[]) =>
  classes.filter((item) => Boolean(item)).join(" ");
