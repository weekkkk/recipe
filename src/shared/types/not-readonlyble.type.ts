export type NotReadonlyble<T> = {
  -readonly [K in keyof T]: T[K];
};
