import { useResponse } from "./useResponse";
import {
  createUseExtendedResponse,
  useExtendedResponse,
} from "./useExtendedResponse";
import { usePostsQuery, useExtendedQuery } from "./useExtendedQuery";

const useCreatedExtendedResponse = createUseExtendedResponse(useResponse);

function App() {
  const response = useResponse({
    response: { name: "useResponse" },
    select: (response) => response.name,
  });

  const createdExtendedResponse = useCreatedExtendedResponse({
    response: { name: "useCreatedExtendedResponse" },
    select: (response) => response.name,
  });

  const extendedResponse = useExtendedResponse({
    useResponse,
    options: {
      response: { name: "useExtendedResponse" },
      select: (res) => res.name,
    },
  });

  // const { data } = usePostsQuery({
  //   select: (response) => response.data,
  // });

  const { data, custom } = useExtendedQuery({
    useQuery: usePostsQuery,
    options: {
      select: (response) => response.data,
    },
  });

  return (
    <>
      <div>{response.data}</div>
      <hr />
      <div>{createdExtendedResponse.data}</div>
      <div>{createdExtendedResponse.custom}</div>
      <hr />

      <div>{extendedResponse.data}</div>
      <div>{extendedResponse.custom}</div>
      <hr />
      <div>
        <b>React Query</b>
      </div>
      <div>{custom}</div>
      <ul>
        {data?.map((el) => (
          <li>{el.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
