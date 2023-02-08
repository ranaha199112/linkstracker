import { useSession } from "next-auth/react";
import React from "react";
import { FaGlobe } from "react-icons/fa";
import Loader from "../common/Loader";
import Table from "../Table";
import { linkColumn } from "../Table/columns/linkColumn";
// import { linkData } from "../data/linkData";
import useGetData from "../../hooks/useGetData";

function AdminLinks({ id, admin }) {
  // const { data: session } = useSession();
  // const { id, username, admin, adminId } = session ? session.user : "";

  const { fetchedData, isLoading } = useGetData(`/link/get/${id}/${admin}`);
  console.log("links", fetchedData);

  const allSites = fetchedData?.sites;
  const activeSites = fetchedData?.data;

  // const x = allSites?.map((site) => site.name);
  // const y = activeSites?.map((site) => site);

  // const status = () => {
  //   const check = x?.map((site) => {
  //     if (y.includes(site)) {
  //       return "active";
  //     } else {
  //       return "inactive";
  //     }
  //   });
  //   return check;
  // };

  // console.log(status());

  const linksData = allSites?.map((site) => {
    const checkStatus = () => {
      if (activeSites?.includes(site.name)) {
        return "Active";
      } else {
        return "Inactive";
      }
    };

    return {
      site: site.name,
      status: checkStatus(),
    };
  });
  console.log("table", linksData);

  // const checkStatus = (site) => {
  //   if (activeSites?.includes(site.name)) {
  //     return "Active";
  //   } else {
  //     return "Inactive";
  //   }
  // };

  return (
    <div className="relative">
      <Loader isLoading={isLoading}>
        <div className="mt-7 bg-white p-4 lg:p-8  rounded shadow-md">
          <h4 className="text-xl font-semibold">All Links</h4>
          {linksData && (
            <Table columnsHeading={linkColumn} usersData={linksData} />
          )}
        </div>
      </Loader>
    </div>
  );
}

export default AdminLinks;
