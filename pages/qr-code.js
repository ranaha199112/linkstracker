import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaQrcode } from "react-icons/fa";
import Loader from "../components/common/Loader";
import useGetData from "../hooks/useGetData";
import { useQRCode } from "next-qrcode";

function QRCodepage() {
  const [selectedSite, setSelectedSite] = useState("");

  const { data: session } = useSession();
  const { id, admin } = session ? session.user : "";

  const isAdmin = !admin && 0;

  // const { fetchedData, isLoading } = useGetData(`/link/get/${id}/${isAdmin}`);
  // console.log("links", fetchedData.data);

  const apiLink = admin ? `/all/poster/${id}` : `/link/get/${id}/${isAdmin}`;

  const { fetchedData, isLoading } = useGetData(apiLink);

  const adminLinks =
    admin &&
    fetchedData?.data?.posters.map(
      (poster) => ({
        username: poster.username,
        links: poster.links,
      })
      // poster.links.map((link) => link)
    );

  // console.log("admin links", adminLinks);

  // console.log("selectedsite", selectedSite);

  console.log("session", session);

  // const allSites = fetchedData?.sites;
  const posterLinks = !admin && fetchedData?.data;

  const { Image } = useQRCode();

  return (
    <div className="">
      <div className="flex items-center gap-3">
        <span className="text-[28px] text-custom-blue2">
          <FaQrcode />
        </span>
        <h1 className="text-2xl font-bold text-custom-gray2">QR Code</h1>
      </div>

      <Loader isLoading={isLoading}>
        <div className="mt-7 flex flex-col lg:flex-row gap-5">
          <div className="lg:sticky top-[95px] lg:self-start lg:min-w-[450px] min-h-[300px] bg-white p-8 rounded shadow-md">
            <h4 className="text-xl font-semibold">Generate QR Code</h4>
            <p className="mt-2 text-sm font-semibold text-custom-gray3">
              Site: {selectedSite}
            </p>
            <div className="mt-3 flex justify-center">
              {selectedSite && <Image text={selectedSite} alt="qr code" />}
            </div>
          </div>

          <div className="flex-1 bg-white rounded shadow-md p-8 overflow-x-auto">
            <h4 className="text-xl font-semibold">All Links</h4>
            <div className="mt-3 w-[350px] lg:w-[500px]">
              {!admin ? (
                <div className="">
                  {posterLinks?.map((site, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <p className="py-3 text-sm text-custom-gray3 font-semibold">
                        {site.split("https://").join("")}
                      </p>

                      <div className="">
                        <button
                          className={`text-xs font-bold text-white px-2 py-1 rounded ${
                            selectedSite === site
                              ? "bg-blue-500"
                              : "bg-cyan-700 "
                          }`}
                          onClick={() => setSelectedSite(site)}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="">
                  {adminLinks?.map((admin, i) => (
                    <div key={i} className="py-5">
                      <p className=" text-custom-gray3 font-semibold">
                        Poster: {admin.username}
                      </p>
                      {admin.links.map((site, i) => (
                        <div
                          key={i}
                          className="py-2 flex items-center justify-between"
                        >
                          <p className=" text-sm text-custom-gray3 font-semibold">
                            {site.split("https://").join("")}
                          </p>

                          <div className="">
                            <button
                              className={`text-xs font-bold text-white px-2 py-1 rounded ${
                                selectedSite === site
                                  ? "bg-blue-500"
                                  : "bg-cyan-700 "
                              }`}
                              onClick={() => setSelectedSite(site)}
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Loader>
    </div>
  );
}

export default QRCodepage;
