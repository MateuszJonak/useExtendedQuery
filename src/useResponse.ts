export type Response<TData = unknown> = {
  data: TData;
};

export type UseResponseOptions<TQueryFnData = unknown, TData = TQueryFnData> = {
  response: TQueryFnData;
  select?: (data: TQueryFnData) => TData;
};

export const useResponse = <TQueryFnData = unknown, TData = TQueryFnData>({
  response,
  select = (response) => response as unknown as TData,
}: UseResponseOptions<TQueryFnData, TData>): Response<TData> => {
  return { data: select(response) };
};
