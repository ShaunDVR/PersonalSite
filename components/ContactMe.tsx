import { useRef, useState } from "react";
import { FaFileAlt, FaEnvelope } from "react-icons/fa";

const ContactMe = () => {
  const [showModal, setShowModal] = useState(false);
  const modalType = useRef("");

  const openModal = (type: string) => {
    modalType.current = type;
    setShowModal(true);
  };

  const closeModal = () => {
    modalType.current = "";
    setShowModal(false);
  };

  const handleDownload = async () => {
    try {
      closeModal();

      const response = await fetch("/ShaunCV.pdf"); // Replace with the actual file path
      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }

      const fileBlob = await response.blob();
      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "ShaunReillyCV.pdf"; // Set the desired file name

      link.click();

      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      console.error("Error while downloading the file:", error);
    }
  };

  const handleEmail = () => {
    const confirmed = window.confirm(
      "Would you like to open your default email App?"
    );
    if (!confirmed) {
      return;
    }

    const emailAddress = "syzygysquare@gmail.com"; // Replace with your email address
    const mailtoLink = `mailto:${emailAddress}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-500 rounded-md max-w-md w-5/6">
            {modalType.current == "CV" ? (
              <p className="text-white text-center p-4">
                Would you like to download my CV to learn more about my
                qualifications and experience?
              </p>
            ) : (
              <>
                <p className="text-white text-center p-4">
                  You can contact me at syzygysquare@gmail.com
                </p>
                <p className="text-white text-center p-4">
                  Would you like to open your default E-mail App?
                </p>
              </>
            )}
            <div className="flex justify-center py-4">
              <button
                className="px-4 py-2 rounded-md bg-gray-500 text-white mx-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              {modalType.current == "CV" ? (
                <button
                  className="px-4 py-2 rounded-md bg-blue-500 text-white mx-2"
                  onClick={handleDownload}
                >
                  Download
                </button>
              ) : (
                <button
                  className="px-4 py-2 rounded-md bg-blue-500 text-white mx-2"
                  onClick={handleEmail}
                >
                  Yes please!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-5 items-center">
        <p className="text-zinc-300">Interested? Let&apos;s get in touch!</p>
        <hr className="w-32 border-t border-gray-300 my-4" />
        <div className="flex w-8/12 h-32 justify-around bg-slate-400">
          <div
            className="flex bg-pinkHold grow items-center justify-center"
            onClick={() => {
              openModal("CV");
            }}
          >
            <FaFileAlt
              size={96}
              color="white"
              className="z-0 absolute opacity-10"
            />
            <p className="z-10">See my CV!</p>
          </div>
          <div
            className="flex bg-wallShade grow items-center justify-center"
            onClick={() => {
              openModal("Email");
            }}
          >
            <FaEnvelope
              color="white"
              size={96}
              className="z-0 absolute opacity-10"
            />
            <p className="z-10">Contact Me!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactMe;
