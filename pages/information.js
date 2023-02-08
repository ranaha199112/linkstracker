import { getSession, useSession } from "next-auth/react";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import Table from "../components/Table";
import { collectionColumn } from "../components/Table/columns/collectionColumn";
// import { API_URL, id, username, admin } from "../config";
import useGetData from "../hooks/useGetData";
// import { infoData } from "../data/infoData";

function InformationPage() {
  const { data: session } = useSession();
  const { id, username, admin, adminId } = session ? session.user : "";

  console.log(id);

  // const infoData = data?.users;

  // /info/:username/:id/:admin

  const { fetchedData } = useGetData(`/info/${username}/${id}/${admin}`);

  console.log("fff", fetchedData);

  return (
    <div className="">
      <div className="flex items-center gap-3">
        <span className="text-[28px] text-custom-blue2">
          <FaEnvelope />
        </span>
        <h1 className="text-2xl font-bold text-custom-gray2">Information</h1>
      </div>

      {/* <div className="mt-7 bg-white rounded shadow-md">
        {infoData && <Table columnsHeading={infoColumn} usersData={infoData} />}
      </div> */}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const {
//     user: { username, id, admin },
//   } = await getSession(context);
//   // const username = session.user.username;

//   console.log(username);

//   const url = `${API_URL}/info/${username}/${id}/${admin}`;

//   const res = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       // Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await res.json();

//   // console.log("data", data);

//   return {
//     props: { data },
//   };
// }

export default InformationPage;
