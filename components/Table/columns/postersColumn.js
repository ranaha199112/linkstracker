import Link from "next/link";
import DeletePoster from "../../DeletePoster";
import { getTimeDistance } from "../../../utils/getTimeDistance";

export const postersColumn = [
  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Password",
    accessor: "password",
  },
  {
    Header: "Poster ID",
    accessor: "posterId",
  },
  {
    Header: "Total Links",
    accessor: "links.length",
    // Cell: ({ value }) => (
    //   <div>
    //     <button className="px-2 py-1 rounded bg-red-700 text-white text-sm">
    //       {value}
    //     </button>
    //   </div>
    // ),
  },
  {
    Header: "Time",
    accessor: "createdAt",
    disableSortBy: true,
    width: "auto",
    Cell: ({ row }) => (
      <div className="flex justify-center items-center">
        {row.original.createdAt && getTimeDistance(row.original.createdAt)}
      </div>
    ),
  },
  {
    Header: "Options",
    accessor: "_id",
    disableSortBy: true,
    width: 200,
    Cell: ({ row }) => (
      <div className="flex justify-center items-center gap-2">
        <div className="">
          <Link href={`/posters/details/${row.original._id}`}>
            <button className="bg-cyan-600 text-xs text-white font-semibold px-2 py-1 rounded">
              Details
            </button>
          </Link>
        </div>

        <div className="">
          <Link href={`/posters/edit/${row.original._id}`}>
            <button className="bg-slate-600 text-xs text-white font-semibold px-2 py-1 rounded">
              Edit
            </button>
          </Link>
        </div>

        <DeletePoster posterInfo={row.original} />
      </div>
    ),
  },
];
