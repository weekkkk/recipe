export interface IChangeValue<T = string> {
  (nextValue: T): void;
  oldValue?: T;
}
