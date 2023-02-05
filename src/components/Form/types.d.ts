declare type WithId = { id?: string };

type ValueType = string | WithId | undefined | null;

declare type Option<T extends ValueType = undefined> = {
  label: string;
  id: string;
  obj?: T;
  hidden?: boolean;
};
