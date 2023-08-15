export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type UnionKeys<T> = T extends any ? keyof T : never;
