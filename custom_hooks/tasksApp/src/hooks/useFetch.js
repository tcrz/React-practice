import { useCallback, useState } from "react";

export default function useFetch(processData) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

//   console.log("right before function call");
  const sendRequest = useCallback(
    async (requestConfig) => {
    //   console.log("called");
      setIsLoading(true);
      setError(null);
      try {
        // console.log("try block");
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        processData(data, requestConfig.body);
      } catch (err) {
        // console.log("further down called");
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    //   console.log("end called");
    },
    [processData]
  );

  return { isLoading, error, sendRequest };
}
