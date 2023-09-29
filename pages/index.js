// import Cards from "../components/Cards";
// import { FaHome } from "react-icons/fa";
// import { useSession } from "next-auth/react";
// import Marquee from "react-fast-marquee";
// // import { useEffect, useState } from "react";
// import useGetData from "../hooks/useGetData";

// export default function Home() {
//   // const [showAd, setShowAd] = useState(false);

//   const { data: session } = useSession();
//   const { adminId } = session ? session.user : "";
//   // const qrCodeStatus = data?.user?.qrCodeStatus;

//   const { data: fetchedData, isLoading } = useGetData(
//     `/qrcode/status/check/${adminId}`
//   );

//   console.log("ad", fetchedData);

//   // useEffect(() => {
//   //   // qrCodeStatus === true && setShowAd(true);
//   //   fetchedData.status !== true && setShowAd(true);
//   // }, []);

//   return (
//     <div className="">
//       <div className="flex items-center gap-3">
//         <span className="text-[28px] text-custom-blue2">
//           <FaHome />
//         </span>
//         <h1 className="text-2xl font-bold text-custom-gray2">Dashboard</h1>
//       </div>
//       <a href="https://www.back4page.com" target="_blank" rel="noreferrer">
//         <div className="mt-7 bg-cyan-700 px-5 py-3 text-white font-semibold">
//           <Marquee gradient={false} speed={150}>
//             <span className="mr-20 md:mr-0">
//               Need more traffic? visit back4page.com
//             </span>
//           </Marquee>
//         </div>
//       </a>

//       {session && fetchedData?.data?.status !== true && !isLoading && (
//         <div className="mt-2 bg-red-700 px-5 py-3 text-white font-semibold">
//           <Marquee gradient={false} speed={130}>
//             <span className="mr-20 md:mr-0">
//               A new feature QR Code Generator is added. Please contact with
//               admin to activate.
//             </span>
//           </Marquee>
//         </div>
//       )}

//       <div className="grid lg:grid-cols-3 gap-8 mt-7 md:grid-cols-2 ">
//         <Cards />
//       </div>
//     </div>
//   );
// }

import { useSession } from "next-auth/react";
import {
  FaCalculator,
  FaHome,
  FaHourglassEnd,
  FaUserAlt,
} from "react-icons/fa";
import Loader from "../components/common/Loader";
import Table from "../components/Table";
import { clicksColumn } from "../components/Table/columns/clicksColumn";
import useGetData from "../hooks/useGetData";

function HomePage() {
  const { data } = useSession();
  const admin = data?.user?.admin;
  const adminId = data?.user?.adminId;
  const posterId = data?.user?.posterId;

  const route = admin ? `/${adminId}` : `/${adminId}/${posterId}`;

  const { data: fetchedData, isLoading, isError } = useGetData(route);

  const {
    data: fetchedData2,
    isLoading: isLoading2,
    isError: isError2,
  } = useGetData(
    `/today/app/details/data/poster/hello/found/end/${
      admin ? adminId : posterId
    }`
  );

  // console.log("fetchedata2", fetchedData2?.data);

  const clicksData = fetchedData?.data?.click;

  const cardsData = fetchedData2?.data;

  // console.log("clicksData", clicksData);

  const cards = [
    {
      name: "Today Found",
      count: cardsData?.todayFound,
      color: "bg-[#E91F63]",
      icon: <FaUserAlt />,
    },
    {
      name: "Today Click",
      count: cardsData?.todayClick,
      color: "bg-[#8AC24B]",
      icon: <FaHourglassEnd />,
    },
    {
      name: "Total Found",
      count: cardsData?.totalFound,
      color: "bg-[#FE8519]",
      icon: <FaCalculator />,
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <span className="text-[28px] text-custom-blue2">
          <FaHome />
        </span>
        <h1 className="text-2xl font-bold text-custom-gray2">Dashboard</h1>
      </div>

      <Loader isLoading={isLoading || isLoading2}>
        <div className="mt-12 flex flex-col lg:flex-row justify-between gap-5 lg:gap-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`min-h-[97px] w-full rounded-md overflow-hidden ${card.color}`}
            >
              <div className="flex h-full">
                <div className="h-full w-[96px] bg-black/30 text-white flex justify-center items-center text-[34px]">
                  {card.icon}
                </div>

                <div className="py-2 px-3 text-white">
                  <p className="uppercase font-semibold">{card.name}</p>
                  <p className="font-bold text-xl">{card.count}</p>
                  <p className="mt-2 text-sm">
                    <span className="mr-3">3.48%</span> Since last month
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white p-4 lg:p-8  rounded shadow-md">
          <h4 className="text-xl font-semibold">Total Clicks</h4>
          {clicksData && (
            <Table columnsHeading={clicksColumn} usersData={clicksData} />
          )}
          {!clicksData && <p className="mt-10 text-lg">No Clicks</p>}
        </div>
      </Loader>
    </div>
  );
}

export default HomePage;
