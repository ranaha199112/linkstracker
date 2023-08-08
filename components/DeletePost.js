import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";

import useGetData from "../hooks/useGetData";
import useDeleteData from "../hooks/useDeleteData";

function DeletePost({ posterInfo }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);

  const { data: session } = useSession();
  const adminId = session?.user?.id;

  // const { mutate } = useGetData(`/all/poster/${adminId}`);

  const { mutate, isLoading, isSuccess, isError } = useDeleteData({
    path: `/delete/poster/${posterInfo._id}/${adminId}`,
    revalidate: `/all/poster/${adminId}`,
  });

  const handleDelete = () => {
    mutate("", {
      onSuccess: () => {
        toast.success(`Poster ${posterInfo.username} Deleted`);
      },
      onSettled: () => {
        setShowDeleteModal(false);
      },
    });

    // setDisableDelete(true);

    // const res = await fetch(
    //   `${API_URL}/delete/poster/${posterInfo._id}/${adminId}`,
    //   {
    //     method: "DELETE",
    //   }
    // );

    // const data = await res.json();

    // // await mutate();

    // if (res.ok) {
    //   console.log("success", data);
    //   toast.success(`Poster ${posterInfo.username} Deleted`);
    // } else {
    //   console.log("error", data);
    //   toast.success("Something went wrong");
    // }

    // setShowDeleteModal(false);
    // setDisableDelete(false);
  };

  return (
    <div className="">
      <button
        className="bg-red-600 text-xs text-white font-semibold px-2 py-1 rounded"
        onClick={() => setShowDeleteModal(true)}
      >
        Delete
      </button>

      {showDeleteModal && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 h-screen w-full overflow-y-hidden">
          <div className="h-screen flex justify-center items-center">
            <div className="mx-2 bg-white p-3 lg:p-8 rounded-lg">
              <div className="pb-4 border-b">
                <p className="text-center text-xl lg:text-2xl text-gray-800">
                  {`Are you sure you want to delete Poster "${posterInfo.username}"?`}
                </p>
              </div>

              <p className="mt-3 text-red-600 text-center">
                {`Warning: All data from poster ${posterInfo.username} will be
                deleted. This action is irreversible.`}
              </p>

              {!isLoading ? (
                <div className="mt-5 lg:mt-8 flex justify-center gap-7 items-center">
                  <button
                    className="bg-blue-600  text-white font-semibold px-4 py-2 rounded"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600  text-white font-semibold px-4 py-2 rounded disabled:bg-opacity-50"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="mt-5 lg:mt-8 flex justify-center items-center">
                  <button className="bg-red-600/50  text-white font-semibold px-4 py-2 rounded cursor-not-allowed">
                    Deleting . . .
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeletePost;
