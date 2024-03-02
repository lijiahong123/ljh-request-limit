type AsyncPoolState = {
    _RESULT: Promise<any>[];
    _pool: Promise<any>[];
}

async function asyncPool<TParams extends any[], TReturn>(
    limit: number,
    requestParams: TParams[],
    requestFn: (...params: TParams) => Promise<TReturn>,
    useAllSettled?: boolean
): Promise<TReturn[] | PromiseSettledResult<TReturn>[]> {
    const state: AsyncPoolState = { _RESULT: [], _pool: [] }
    if (typeof requestFn !== 'function') throw new Error('缺少真实请求函数');
    if (!Array.isArray(requestParams)) throw new Error('asyncpool params "requestParams" should is array')

    for (const params of requestParams) {
        if (!Array.isArray(params)) throw new TypeError("请求参数需要放到一个数组里面");

        const task = Promise.resolve().then(() => requestFn(...params));
        state._RESULT.push(task);

        if (state._RESULT.length >= limit) {
            const e = task.then(() => state._pool.splice(state._pool.indexOf(e), 1)) as Promise<any>
            state._pool.push(e);
            if (state._pool.length >= limit) {
                await Promise.race(state._pool);
            }
        }
    }
    if (useAllSettled) {
        return Promise.allSettled(state._RESULT);
    }
    return Promise.all(state._RESULT)

}

export default asyncPool;