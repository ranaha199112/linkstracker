import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";
// import useGetData from "../hooks/useGetData";
import useToggle from "../hooks/useToggle";

function DeletePost({ posterInfo }) {
  const {
    toggle: showDeleteModal,
    setToggle: setShowDeleteModal,
    node,
  } = useToggle();
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);

  const router = useRouter();
  // const pathname = usePathname();

  const { data: session } = useSession();

  const adminId = session?.user?.id;

  // console.log("deleted", posterInfo);

  // const getData = useGetData(`/all/poster/${posterInfo._id}`);

  const handleDelete = async () => {
    setDisableDelete(true);

    const res = await fetch(
      `${API_URL}/delete/poster/${posterInfo._id}/${adminId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (res.ok) {
      console.log("success", data);
      toast.success(`Poster ${posterInfo.username} Deleted`);
      setShowDeleteModal(false);
      setDisableDelete(false);
      router.refresh();
      // getData();
      // router.replace(pathname);
    } else {
      console.log("error", data);
      toast.success("Something went wrong");
      setDisableDelete(false);
      setShowDeleteModal(false);
    }
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
        // <div className="">
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 h-screen w-full">
          <div className="h-screen flex justify-center items-center">
            <div ref={node} className="mx-2 bg-white p-3 lg:p-8 rounded-lg">
              <div className="pb-4 border-b">
                <p className="text-center text-xl lg:text-2xl text-gray-800">
                  {`Are you sure you want to delete Poster "${posterInfo.username}
                  "?`}
                </p>
              </div>

              <p className="mt-3 text-red-600 text-center">
                {`Warning: All data from poster ${posterInfo.username} will be
                deleted. This action is irreversible.`}
              </p>

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
                  disabled={disableDelete}
                >
                  {!disableDelete ? "Delete" : "Deleting"}
                </button>
              </div>
            </div>
          </div>
        </div>
        // </div>
      )}
    </div>
  );
}

export default DeletePost;
