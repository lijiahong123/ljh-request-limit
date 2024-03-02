declare function asyncPool<TParams extends any[], TReturn>(limit: number, requestParams: TParams[], requestFn: (...params: TParams) => Promise<TReturn>, useAllSettled?: boolean): Promise<TReturn[] | PromiseSettledResult<TReturn>[]>;
export default asyncPool;
