import { UseResponseOptions, Response } from "./useResponse";

export type UseExtendedResponseProps<
  TQueryFnData = unknown,
  TData = TQueryFnData
> = {
  options: UseResponseOptions<TQueryFnData, TData>;
  useResponse: <TData2 = TData>(
    options: UseResponseOptions<TQueryFnData, TData2>
  ) => Response<TData2>;
};

export const useExtendedResponse = <
  TQueryFnData = unknown,
  TData = TQueryFnData
>({
  useResponse,
  options,
}: UseExtendedResponseProps<TQueryFnData, TData>) => {
  const response = useResponse(options);

  return {
    ...response,
    custom: "custom1",
  };
};

export const createUseExtendedResponse = <
  TQueryFnData = unknown,
  TData = TQueryFnData
>(
  useResponse: (
    options: UseResponseOptions<TQueryFnData, TData>
  ) => Response<TData>
) => {
  const useHook = (options: UseResponseOptions<TQueryFnData, TData>) => {
    const response = useResponse(options);
    return {
      ...response,
      custom: "custom1",
    };
  };

  return useHook;
};
