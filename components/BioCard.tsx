import Image from "next/image";
import { useEffect, useState } from "react";

import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { AiFillInstagram } from "react-icons/ai";

const BioCard = () => {
  const [isClient, setIsClient] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the resize handler initially to set the initial window size
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-80 h-full ">
      {isClient && (
        <Image
          src="/pencil.png"
          alt=""
          width={window.innerWidth / 8}
          height={window.innerHeight / 2}
          className="pencilImg absolute rotate-12 left-32 "
        />
      )}
      <div className="cardContainer relative lg:w-1/2 lg:h-3/4 lg:left-1/4 lg:mg-0 lg:ml-0 w-3/4 h-3/4 left-1/2 ml-[-35%] grid grid-rows-5 grid-rows-auto bg-gray-900 border-8 border-white">
        <div className="row-span-1 bg-teal-800 border-b-8 border-r border-white watercolor-bg text-center flex flex-col justify-center">
          <h2 className=" text-2xl text-white">Shaun Reilly</h2>
          <p className="personalDetails mb-5 text-white">
            Full Stack Web-dev
            <BsGlobeCentralSouthAsia className=" inline-flex ml-5 mr-5" />
            Nr. Manchester, UK
          </p>
          <div className="socialIconContainer flex  justify-center space-x-5">
            <FaFacebook color="white" />
            <FiTwitter color="white" />
            <AiFillInstagram color="white" />
            <AiFillLinkedin color="white" />
          </div>
        </div>
        <div className="row-span-2 grid grid-cols-2 bg-slate-800 paper-bg">
          <div className="skillsHobbiesContainer border-b-8 border-white text-white flex flex-col justify-evenly items-center">
            <div className="grid grid-rows-2 grid-cols-2 items-center ml-4">
              <div className="row-span-1 col-span-1 mr-20">Skills</div>
              <div className="row-span-1 col-span-1">
                <p>One</p>
                <p>Two</p>
                <p>Three</p>
              </div>
              <div className="row-span-1 col-span-1 mt-8">Hobbies</div>
              <div className="row-span-1 col-span-1 mt-8">
                <p>One</p>
                <p>Two</p>
                <p>Three</p>
              </div>
            </div>
          </div>
          <div className=" border-b-8 border-r border-white flex flex-col justify-center items-center">
            <div className="h-full w-full relative">
              <Image
                src={"/face-image-placeholder2.png"}
                alt=""
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
        <div className="row-span-2 bg-teal-100 bg-gradient-to-br from-teal-100 to-teal-500 border-b border-r  border-white flex flex-col justify-center items-center p-4">
          <p className=" text-sm font-bradley overflow-hidden">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac
            nisi eu elit pretium tincidunt ut sed tellus. Sed sapien augue,
            convallis ac fringilla et, egestas at lectus. Pellentesque tristique
            maximus sapien. In rhoncus aliquet rhoncus. Nulla nec suscipit
            massa. Vivamus ultricies varius tortor fringilla ultricies. Quisque
            at enim ac arcu tincidunt pulvinar ac sit amet erat. Mauris
            dignissim semper ex, sed lobortis felis rhoncus et. In mattis eget
            nisl laoreet scelerisque. Donec sit amet varius velit, nec dignissim
            lacus. Morbi faucibus, libero sit amet malesuada accumsan, urna
            lorem tristique lacus, ac facilisis velit est in ante. Integer in
            mattis turpis. Vivamus leo ipsum, vulputate et eleifend eget,
            fermentum nec velit. Duis eu sem quis sapien porta aliquam. Vivamus
            tortor nisl, imperdiet vitae condimentum at, hendrerit in justo.
            Vivamus sit amet accumsan lorem, at tincidunt nisl. Fusce et blandit
            quam, sit amet varius erat. Phasellus porttitor, dui non bibendum
            rutrum, dolor urna feugiat lectus, sit amet pretium orci sem id
            elit. Vivamus vitae turpis tempor, feugiat urna in, sodales turpis.
            Etiam a urna eu nibh fringilla commodo. Aliquam malesuada tristique
            neque ac vehicula. Mauris molestie at leo a porta. Praesent maximus
            risus sed est vestibulum mattis. Integer imperdiet gravida nisl, at
            scelerisque erat tempor id. Vestibulum vitae diam vitae enim rhoncus
            iaculis. Nunc non dolor et massa fermentum viverra hendrerit eget
            enim. Nam efficitur rhoncus felis, eu rutrum turpis ultrices eget.
            Vivamus in nisl nibh.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioCard;
