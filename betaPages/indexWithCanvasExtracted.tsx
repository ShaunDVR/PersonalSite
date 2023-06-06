import React, { useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import PointingHand from "../public/pointing-hand.svg";
import BioCard from "@/components/BioCard";
import CanvasComponent from "@/components/MatterJSCanvas";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const devStrictModeFix = useRef(!(process.env.NODE_ENV === "development"));
  const handOpacity = useRef(-1);
  const animDelay = useRef(true);
  const screenSize = useRef<number | null>(null);

  const marqueeLines = [
    "React Developer",
    "Angular Developer",
    "Java Springboot",
    "Tailwind CSS",
    "NextJS",
    "MongoDB, SQL, Firebase",
    "Web-dev Teacher",
    "Microservices",
    "Unit Testing",
    "That U is intentional",
    "Git Workflow",
  ];
  const [currentLine, setCurrentLine] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(process.env.NODE_ENV);
    if (devStrictModeFix.current === false) {
      devStrictModeFix.current = true;
      return;
    }

    const animTimeout = setTimeout(() => {
      animDelay.current = false;
      handOpacity.current = 1;
    }, 7000);

    const marqueeInterval = setInterval(() => {
      if (animDelay.current === true) {
        return;
      }
      let randomIndex = Math.floor(Math.random() * marqueeLines.length);
      while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * marqueeLines.length);
      }
      setCurrentLine(marqueeLines[randomIndex]);
      setCurrentIndex(randomIndex);
    }, 3000);

    document.body.classList.add("hide-scrollbar");

    screenSize.current = window.innerWidth;

    if (screenSize.current && screenSize.current < 900) {
      const animTimeoutFaster = setTimeout(() => {
        animDelay.current = false;
        handOpacity.current = 1;
      }, 3000);
    }

    const handleMouseWheel = (event: { deltaY: any }) => {
      const deltaY = event.deltaY;

      window.scrollBy({
        top: deltaY * 3,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleMouseWheel);

    // Rest of the code...

    return () => {
      clearInterval(marqueeInterval);
      window.removeEventListener("wheel", handleMouseWheel);
    };
  }, []);

  return (
    <div className="bg-slate-800">
      <div className="bg-slate-800 flex flex-col h-screen overflow-hidden">
        <CanvasComponent screenSize={screenSize.current || 0} />
        <div className="marqueen-container absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 uppercase text-center">
          <TransitionGroup>
            <CSSTransition key={currentLine} classNames="fade" timeout={500}>
              <h2 className="text-3xl">{currentLine}</h2>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <PointingHand
          hidden={animDelay.current}
          opacity={handOpacity.current}
          height={"5vh"}
          className="absolute z-10 bottom-1.5 left-1/2 transform rotate-90 -translate-x-1/2 -translate-y-1/2 duration-200 transition-opacity animate-pulse"
        />
      </div>
      <div className="h-screen bg-slate-800">
        <BioCard />
      </div>
    </div>
  );
}
