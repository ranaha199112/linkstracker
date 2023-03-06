import { API_URL } from "../config";
import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import useGetData from "./useGetData";

function usePostData(path) {
  // const [submitted, setSubmitted] = useState("");
  // const { data } = useSession();
  // const { token, id } = data ? data.user : "";

  const { data: session } = useSession();

  const adminId = session?.user?.id;

  const router = useRouter();

  const { mutate, isLoading } = useGetData(`/all/poster/${adminId}`);

  const url = `${API_URL}${path}`;

  // console.log(url);

  const postData = async (values, goto, formik) => {
    // console.log(values);
    // return;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      mutate();
      console.log("success", data);
      toast.success("Submitted Succcessfully");
      // setSubmitted(true);
      goto && router.push(`${goto}`);
      // formik.resetForm();
    } else {
      console.log("error", data);
      // setSubmitted(false);
      toast.error(data.error);
    }
  };

  return { postData };

  // return { postData, submitted };
}

export default usePostData;

// // import { useSelector } from "react-redux";
// import { useSession } from "next-auth/react";
// import { API_URL } from "../../config";
// import { toast } from "react-toastify";

// function usePostData(route) {
//   // const { token, id } = useSelector((state) => state.auth);
//   const { data } = useSession();
//   const { token, id } = data ? data.user : "";

//   const url = `${API_URL}${route}/${id}`;

//   const postData = async (values, formik) => {
//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       toast.success("Form Submitted Successfully!");
//       console.log("message", data.data);
//       // formik.resetForm();
//     } else {
//       console.log("error", data.message);
//       toast.error(data.message);
//     }
//   };

//   return { postData };
// }

// export default usePostData;
