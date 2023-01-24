import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const usePostsQuery = <
  TQueryFnData = AxiosResponse<Post[]>,
  TError = unknown,
  TData = TQueryFnData
>(
  options?: UseQueryOptions<AxiosResponse<Post[]>, TError, TData, ["posts"]>
) => {
  return useQuery<AxiosResponse<Post[]>, TError, TData, ["posts"]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response;
    },
    ...options,
  });
};

export type UseExtendedQueryProps<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = {
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
  useQuery: <TData2 = TData>(
    options?: UseQueryOptions<TQueryFnData, TError, TData2, TQueryKey>
  ) => UseQueryResult<TData2, TError>;
};
export const useExtendedQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  options,
  useQuery,
}: UseExtendedQueryProps<TQueryFnData, TError, TData, TQueryKey>) => {
  const result = useQuery(options);

  return {
    ...result,
    custom: "custom1",
  };
};
