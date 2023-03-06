import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { API_URL } from "../config";

function DeletePost({ posterInfo }) {
  const router = useRouter();

  const { data: session } = useSession();

  const adminId = session?.user?.id;

  // console.log("deleted", posterInfo);

  const handleDelete = async () => {
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
      router.reload();
    } else {
      console.log("error", data);
      toast.success("Something went wrong");
    }
  };

  return (
    <div className="">
      <button
        className="bg-red-600 text-xs text-white font-semibold px-2 py-1 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default DeletePost;
