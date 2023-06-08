import Image from "next/image";
import { useEffect, useState } from "react";

import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { AiFillInstagram } from "react-icons/ai";

const BioCard = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
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
    <div className="mt-12 lg:mt-32 h-full ">
      {/* <Image
        src="/pencil.png"
        alt=""
        width={window.innerWidth / 8}
        height={window.innerHeight / 2}
        className="pencilImg absolute rotate-12 left-32 "
      /> */}
      <div className="cardContainer relative lg:w-1/2 lg:h-3/4 lg:left-1/4 lg:mg-0 lg:ml-0 w-3/4 h-3/4 left-1/2 ml-[-36.6%] grid grid-rows-5 grid-rows-auto bg-gray-900 border-8 border-white">
        <div className="row-span-1 bg-teal-800 border-b-8 border-r border-white watercolor-bg text-center flex flex-col justify-center">
          <h2 className=" lg:text-3xl text-xl text-white">Shaun Reilly</h2>
          <p className="personalDetails text-white lg:text-base text-sm">
            Full Stack Web-dev
            <BsGlobeCentralSouthAsia className=" inline-flex ml-5 mr-5" />
            Nr. Manchester, UK
          </p>
          <div className="socialIconContainer flex justify-center space-x-5 lg:mt-5 mt-2">
            <FaFacebook color="white" />
            <FiTwitter color="white" />
            <AiFillInstagram color="white" />
            <AiFillLinkedin color="white" />
          </div>
        </div>
        <div className="row-span-2 grid grid-cols-2 bg-slate-800 paper-bg">
          <div className="skillsHobbiesContainer border-b-8 border-white text-white flex flex-col justify-evenly items-center">
            <div className="grid grid-rows-2 grid-cols-2 items-center ml-4 gap-x-4 lg:text-lg text-sm">
              <div className="row-span-1 col-span-1 ">Skills</div>
              <div className="row-span-1 col-span-1">
                <p>Full Stack Web Development</p>
                <p>Teaching and Instruction</p>
                <p>Entrepreneurial Mindset</p>
              </div>
              <div className="row-span-1 col-span-1 mt-8">Hobbies</div>
              <div className="row-span-1 col-span-1 mt-8">
                <p>Climbing</p>
                <p>Painting</p>
                <p>Cooking</p>
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
          <p className=" text-sm font-bradley overflow-scroll">
            I&apos;m Shaun Reilly, a growth-focused programmer with a passion
            for full stack web development. I thrive on challenges and have an
            insatiable drive to continuously expand my skills. With a diverse
            background in teaching, content creation, and running my own online
            business, I bring a wealth of experiences to the table. My lifelong
            hobbyist interest in programming led me to secure a place on the
            2022 BECAS Santander Scholarship program, where I immersed myself in
            Full Stack Web Development. Since then, I have successfully taught
            both Front and Back End Web Development, demonstrating my dedication
            to sharing knowledge and empowering others. By staying abreast of
            the latest industry trends, I offer a fresh perspective and an
            innovative approach to every project. If you&apos;re searching for a
            motivated and versatile programmer to contribute to your team&apos;s
            success, let&apos;s connect and bring our collective ideas to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioCard;
