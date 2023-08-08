import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import usePostData from "../../hooks/usePostData";
import { CheckboxField, TextField } from "../common/InputField";
import useGetData from "../../hooks/useGetData";
import { useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function PosterForm({ id, adminId }) {
  // const { data: session } = useSession();
  // const { id, username, admin, adminId } = session ? session.user : "";

  // console.log("form", data);

  // const id = data?.user?.id;

  // const adminId = data?.user?.adminId;

  const router = useRouter();

  const [linksError, setLinksError] = useState(false);

  const { data: fetchedData } = useGetData(`/link/get/${id}`);

  const { mutate, isLoading, isError, error, isSuccess } = usePostData({
    path: "/admin/add",
    revalidate: `/all/poster/${id}`,
    // onSuccess,
    // onError,
  });

  const initialvalues = {
    username: "",
    password: "",
    posterId: "",
    links: [],
  };

  const validate = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    posterId: Yup.string()
      .required("Poster Id is required")
      .max(3, "Not More than 3 characters")
      .matches(/^[a-zA-Z0-9@]+$/, "Cannot contain space and special character"),
    links: Yup.array().min(1, "Atleast one link is required"),
  });

  // console.log("links", fetchedData?.users);

  const fetchedLinks = fetchedData?.data?.users;

  const handleSubmit = (values, formik) => {
    const { username, password, posterId, links } = values;
    const submitvalues = {
      id: id,
      username: username,
      password: password,
      posterId: posterId,
      links: links,
    };

    if (submitvalues.links.length === 0) {
      setLinksError(true);
    } else {
      setLinksError(false);
      mutate(submitvalues, { onSuccess: () => formik.resetForm() });
    }
  };

  return (
    <div className="mt-7">
      <Formik
        initialValues={initialvalues}
        validationSchema={validate}
        onSubmit={handleSubmit}
        // enableReinitialize
      >
        {(formik) => (
          <Form>
            <h1 className="text-lg font-semibold ">Add New Poster</h1>
            <div className="pt-7 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-5 md:gap-y-7">
              <TextField label="Username *" name="username" type="text" />
              <TextField label="Password *" name="password" type="text" />
              <TextField
                label="Poster Id (max 3 characters) *"
                name="posterId"
                type="text"
                maxLength={3}
              />
              <div className="">
                <p className="font-semibold text-gray-600">Links *</p>
                <div className="flex flex-col">
                  {formik.values.posterId ? (
                    <div className="relative">
                      <div className="mt-2 grid grid-cols-1 gap-x-10 divide-y-2 w-full border border-gray-200 overflow-hidden">
                        {fetchedLinks?.map((link, i) => (
                          <CheckboxField
                            key={i}
                            name="links"
                            label={`${link
                              ?.split("https://")
                              ?.join("")}/${adminId}/${formik.values.posterId}`}
                            value={`${link}/${adminId}/${formik.values.posterId}`}
                            resetonchange="true"
                          />
                        ))}
                      </div>
                      {linksError ? (
                        <p className="absolute -bottom-5 text-red-600 text-xs font-semibold">
                          Atleast one link is required
                        </p>
                      ) : (
                        ""
                      )}
                      <p className="absolute -bottom-5 text-red-600 text-xs font-semibold">
                        <ErrorMessage name="links" />
                      </p>
                    </div>
                  ) : (
                    <p className="mt-2 font-semibold text-gray-600">
                      Enter User ID First
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-start">
              <button
                type="submit"
                className="px-9 py-4 text-white text-xs tracking-widest font-bold rounded bg-custom-blue5 hover:bg-custom-blue active:scale-95 transition duration-300 uppercase disabled:bg-opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PosterForm;
