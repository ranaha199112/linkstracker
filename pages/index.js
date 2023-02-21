import Cards from "../components/Cards";
import { FaHome } from "react-icons/fa";
import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";

export default function Home() {
  // const [showAd, setShowAd] = useState(false);

  const { data: session } = useSession();
  const { adminId } = session ? session.user : "";
  // const qrCodeStatus = data?.user?.qrCodeStatus;

  const { fetchedData, isLoading } = useGetData(
    `/qrcode/status/check/${adminId}`
  );

  console.log("ad", fetchedData);

  // useEffect(() => {
  //   // qrCodeStatus === true && setShowAd(true);
  //   fetchedData.status !== true && setShowAd(true);
  // }, []);

  return (
    <div className="">
      <div className="flex items-center gap-3">
        <span className="text-[28px] text-custom-blue2">
          <FaHome />
        </span>
        <h1 className="text-2xl font-bold text-custom-gray2">Dashboard</h1>
      </div>

      {fetchedData.status !== true && !isLoading && (
        <div className="mt-7 bg-red-700 px-5 py-3 text-white font-semibold">
          A new feature QR Code Generator is added. Please contact with admin to
          activate.
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8 mt-7 md:grid-cols-2 ">
        <Cards />
      </div>
    </div>
  );
}
