const ContactMe = () => {
  const handleDownload = async () => {
    try {
      const confirmed = window.confirm("Do you want to download the file?");

      if (!confirmed) {
        return;
      }

      const response = await fetch("/paper-texture.png"); // Replace with the actual file path

      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }

      const fileBlob = await response.blob();

      const url = window.URL.createObjectURL(fileBlob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "myfile.txt"; // Set the desired file name

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
      <div className=" flex flex-col gap-5 items-center">
        <p className=" text-zinc-300">Interested? Let&apos;s get in touch!</p>
        <hr className="w-32 border-t border-gray-300 my-4" />
        <div className="flex w-10/12 h-32 justify-around bg-slate-400">
          <div
            className="flex bg-pinkHold grow items-center justify-center"
            onClick={handleDownload}
          >
            <p>CV</p>
          </div>
          <div
            className="flex bg-wallShade grow items-center justify-center"
            onClick={handleEmail}
          >
            <p>Contact Me!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactMe;
