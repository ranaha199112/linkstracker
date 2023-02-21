// import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
// import { useQuery } from "react-query";
// import { API_URL, token, id, identity_id } from "../../config";
import { API_URL } from "../config";

function useGetData(route) {
  const { data, status } = useSession();
  // const { token, id, identity_id } = data ? data.user : "";

  // console.log("access data is", data);

  // const id = Cookies.get("id");

  //with react-query
  // const url = `${API_URL}/${route}/${id}/${identity_id ? identity_id : ""}`;

  // const fetcher = async () => {
  //   const res = await fetch(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const fetchedData = await res.json();

  //   console.log("fetched", fetchedData);
  //   return fetchedData.data;
  // };

  // const {
  //   isLoading,
  //   isError,
  //   error,
  //   data: fetchedData,
  // } = useQuery(route, fetcher);

  // return {
  //   fetchedData: fetchedData ? fetchedData : "",
  //   isLoading,
  //   isError,
  //   // error: error.data,
  // };

  //with swr
  const fetcher = async (url) => {
    const res =
      // status === "authenticated" &&
      await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
    const fetchedData = await res.json();

    console.log("fetched", fetchedData);
    return fetchedData;
  };

  const url = `${API_URL}${route}`;
  // console.log("test", url);
  // const { data: fetchedData, error } = useSWR(`${API_URL}${route}`, fetcher);
  const { data: fetchedData, error } = useSWR(url, fetcher);

  return {
    fetchedData: fetchedData ? fetchedData : "",
    isLoading: !error && !fetchedData,
    isError: error,
  };

  // with useEffect
  // const [fetchedData, setFetechedData] = useState("");

  // const url = `${API_URL}${route}`;

  // useEffect(() => {
  //   const fetcher = async () => {
  //     const res = await fetch(url);
  //     const data = await res.json();

  //     if (res.ok) {
  //       setFetechedData(data);
  //       console.log("success", data);
  //     } else {
  //       console.log("error", data);
  //     }
  //   };

  //   fetcher();
  // }, [route]);

  // return { fetchedData };
}

export default useGetData;
