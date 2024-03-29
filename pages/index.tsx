"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter, { Mouse, MouseConstraint } from "matter-js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ClimbingBoxLoader } from "react-spinners";

import { getXValueInRange } from "@/utils/UtilFunctions";

import PointingHand from "../public/pointing-hand.svg";
import BioCard from "@/components/BioCard";
import ContactMe from "@/components/ContactMe";
import AppFooter from "@/components/AppFooter";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const devStrictModeFix = useRef(!(process.env.NODE_ENV == "development"));
  let handOpacity = useRef(-1);
  let animDelay = useRef(true);
  let screenSize = useRef<number | null>(null);
  let matterRunData = useRef();

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
    "Project Management",
    "Team Lead",
    "Agile & Waterfall",
  ];
  const [currentLine, setCurrentLine] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const animTimeout = setTimeout(() => {
      animDelay.current = false;
      handOpacity.current = 1;
    }, 3000);

    let usedIndexi: number[] = [];

    const marqueeInterval = setInterval(() => {
      if (animDelay.current == true) {
        return;
      }
      let randomIndex = Math.floor(Math.random() * marqueeLines.length);
      while (usedIndexi.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * marqueeLines.length);
      }
      usedIndexi.push(randomIndex);
      setCurrentLine(marqueeLines[randomIndex]);
      setCurrentIndex(randomIndex);

      if (usedIndexi.length === marqueeLines.length) {
        usedIndexi = [];
      }
    }, 4000);

    document.body.classList.add("hide-scrollbar");

    screenSize.current = window.innerWidth;

    if (screenSize.current && screenSize.current < 1009) {
      const animTimeoutFaster = setTimeout(() => {
        animDelay.current = false;
        handOpacity.current = 1;
      }, 3000);
    }

    const handleMouseWheel = (event: { deltaY: any }) => {
      // Get the deltaY value to determine the direction of the scroll
      const deltaY = event.deltaY;

      // Scroll the page based on the deltaY value
      window.scrollBy({
        top: deltaY * 3,
        behavior: "smooth", // You can change this to "auto" for instant scrolling
      });
    };

    window.addEventListener("wheel", handleMouseWheel);

    function createTextObject(
      text: string,
      x: number,
      y: number,
      fontsize?: number,
      rotation?: number
    ) {
      const fontSize = fontsize ? fontsize : 250;
      const textElement = document.createElement("div");
      textElement.className = "canvasControlledElement";
      textElement.style.position = "absolute";
      textElement.style.left = `${x}px`;
      textElement.style.top = `${y}px`;
      textElement.style.fontSize = `${fontSize}px`;
      textElement.style.color = "black";
      textElement.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
      textElement.style.pointerEvents = "none"; // Set pointer-events to none
      textElement.innerHTML = text;
      if (text == "U") {
        textElement.style.rotate = "0.4rad";
      }
      if (rotation) {
        textElement.style.writingMode = "vertical-rl";
        textElement.style.textOrientation = "upright";
      }
      document.body.appendChild(textElement);

      let width = textElement.clientWidth;
      let height = textElement.clientHeight;
      let body: any;
      if (rotation) {
        body = Matter.Bodies.rectangle(x, y, height, width, {
          isStatic: false,
          render: { visible: false },
          frictionAir: 0.08 + Math.random() * 0.06,
          label: text,
          inertia: Infinity,
          collisionFilter: {
            category: 0x0002, // Collides with everything except floor
            mask: 0x0001, // Collides with floor
          },
        });
      } else {
        body = Matter.Bodies.rectangle(x, y, width, height, {
          isStatic: false,
          render: { visible: false },
          frictionAir: 0.08 + Math.random() * 0.06,
          label: text,
          inertia: Infinity,
          collisionFilter: {
            category: 0x0002, // Collides with everything except floor
            mask: 0x0001, // Collides with floor
          },
        });
      }
      Matter.Body.setInertia(body, Infinity);

      const updateTextPosition = () => {
        let previousHeight = parseFloat(textElement.style.top);
        const position = body.position;
        textElement.style.left = `${position.x - width / 2}px`;
        textElement.style.top = `${position.y - height / 2}px`;
        if (
          position.y > window.innerHeight ||
          position.x > window.innerWidth ||
          position.x < 0
        ) {
          Matter.World.remove(engine.world, body, true);
          textElement.remove();
        }
      };

      Matter.Events.on(engine, "afterUpdate", updateTextPosition);

      return { body, textElement };
    }

    // Rotation Version Kinda buggy
    // function createTextObject(text: string, x: number, y: number) {
    //   const fontSize = 250;
    //   const textElement = document.createElement("div");
    //   textElement.style.position = "absolute";
    //   textElement.style.left = `${x}px`;
    //   textElement.style.top = `${y}px`;
    //   textElement.style.fontSize = `${fontSize}px`;
    //   textElement.style.color = "black";
    //   textElement.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
    //   textElement.innerHTML = text;
    //   if (text == "U") {
    //     textElement.style.rotate = "0.4rad";
    //   }
    //   document.body.appendChild(textElement);

    //   const width = textElement.clientWidth;
    //   const height = textElement.clientHeight;
    //   const body = Matter.Bodies.rectangle(x, y, width, height * 0.8, {
    //     isStatic: false,
    //     render: { visible: true },
    //     frictionAir: 0.1 - Math.random() * 0.05,
    //     label: text,
    //   });
    //   if (text == "U") {
    //     body.angle = 0.4;
    //   }

    //   const updateTextPosition = () => {
    //     let previousHeight = parseFloat(textElement.style.top);
    //     const position = body.position;
    //     const angle = body.angle;
    //     textElement.style.left = `${position.x - width / 2}px`;
    //     textElement.style.top = `${position.y - height / 2}px`;
    //     textElement.style.rotate = `${body.angle}rad`;
    //     if (body.position.y > window.innerHeight / 2.2) {
    //       body.isStatic = true;
    //     }
    //   };

    //   Matter.Events.on(engine, "afterUpdate", updateTextPosition);

    //   return { body, textElement };
    // }

    function createTextBodiesFromString(string: string, fontSize?: number) {
      for (let i = 0; i < string.length; i++) {
        const charXValue = getXValueInRange(
          window.innerWidth / 10,
          window.innerWidth - window.innerWidth / 10,
          string.length,
          i
        );
        const charText = createTextObject(
          string[i],
          charXValue,
          -350,
          fontSize ? fontSize : 300
        );
        bodies.push(charText.body);
      }
    }

    const canvas = canvasRef.current;
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      canvas: canvas ? canvas : undefined,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: "transparent",
        wireframeBackground: "transparent",
        wireframes: false,
      },
    });

    const bodies:
      | any[]
      | Matter.Body[]
      | Matter.Composite[]
      | Matter.Constraint[]
      | Matter.MouseConstraint[] = [];

    const floor = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight / 2 + window.innerHeight / 2.5,
      window.innerWidth,
      window.innerHeight / 2,
      { isStatic: true, render: { visible: false } }
    );
    const trueFloor = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight,
      window.innerWidth,
      1,
      { isStatic: true, render: { visible: false } }
    );
    const ceiling = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      0,
      window.innerWidth,
      10,
      {
        isStatic: true,
        render: { visible: false },
        collisionFilter: {
          category: 0x0002,
          mask: 0x0000,
        },
      }
    );
    if (screenSize && screenSize.current > 900) {
      const leftWall = Matter.Bodies.rectangle(
        0,
        window.innerHeight / 2,
        10,
        window.innerHeight,
        { isStatic: true, render: { visible: false } }
      );

      const rightWall = Matter.Bodies.rectangle(
        window.innerWidth,
        window.innerHeight / 2,
        10,
        window.innerHeight,
        { isStatic: true, render: { visible: false } }
      );
      bodies.push(floor, trueFloor, leftWall, rightWall, ceiling);
    } else {
      bodies.push(floor, trueFloor, ceiling);
    }

    function spawnLastNameWithDelay(fontsize?: number) {
      setTimeout(() => {
        const surnameBody = createTextObject(
          "Reilly",
          window.innerWidth * 0.9,
          -100,
          fontsize ? fontsize : 50
        );
        surnameBody.body.frictionAir = 0.01;
        surnameBody.body.restitution = 0.4;
        surnameBody.body.force = !fontsize
          ? { x: -0.15, y: 0 }
          : { x: 0, y: 0 };

        // Set collision filter for surnameBody
        surnameBody.body.collisionFilter = {
          category: 0x0002, // Collides with floor
          mask: 0x0001, // Collides with everything except floor
        };

        Matter.World.add(engine.world, surnameBody.body);
      }, 3000); // Delay of 5000 milliseconds (5 seconds)
    }

    function spawnLastNameWithDelayMobile() {
      setTimeout(() => {
        const surnameBody = createTextObject(
          "REILLY",
          window.innerWidth * 0.7,
          -100,
          60,
          -Math.PI / 2
        );
        surnameBody.body.frictionAir = 0.1;
        surnameBody.body.restitution = 0.4;
        surnameBody.textElement.style.letterSpacing = "1px";
        Matter.Body.rotate(surnameBody.body, Math.PI / 2);

        Matter.World.add(engine.world, surnameBody.body);
      }, 4000); // Delay of 5000 milliseconds (5 seconds)
    }

    function createDesktopConstraints() {
      const constraintOptions = {
        stiffness: 0.0001,
        damping: 0.001,
        length: window.innerHeight / 10,
      };

      for (let i = 5; i < bodies.length; i++) {
        const charXValue = getXValueInRange(
          window.innerWidth / 10,
          window.innerWidth - window.innerWidth / 10,
          bodies.length - 2,
          i
        );
        const attachPoint = () => {
          let letter = bodies[i].label;
          switch (letter) {
            case "S":
              return { x: 0, y: -65 };
            case "H":
              return { x: 0, y: 10 };
            case "A":
              return { x: 0, y: -55 };
            // Rotation problems
            case "U":
              return { x: -45, y: -55 };
            // case "U":
            //   return { x: 0, y: 90 };
            default:
              return { x: 0, y: 0 };
          }
        };
        const constraint = Matter.Constraint.create({
          bodyA: ceiling,
          pointA: { x: charXValue - window.innerWidth / 1.2, y: 0 },
          bodyB: bodies[i],
          pointB: attachPoint(),
          render: {
            type: "line",
            anchors: false,
            strokeStyle: `#875638`,
            lineWidth: 7,
          },
          ...constraintOptions,
        });

        Matter.World.add(engine.world, constraint);
      }
    }

    function createMobileConstraints() {
      const constraintOptions = {
        stiffness: 0.1,
        damping: 0.01,
        length: window.innerHeight / 13,
      };
      const constraintOptionsTop = {
        stiffness: 0.1,
        damping: 0.01,
        length: window.innerHeight / 20,
      };

      const charXValue = getXValueInRange(
        window.innerWidth / 10,
        window.innerWidth - window.innerWidth / 10,
        bodies.length - 3,
        2
      );
      const constraint = Matter.Constraint.create({
        bodyA: ceiling,
        pointA: { x: charXValue - window.innerWidth / 1.6, y: 0 },
        bodyB: bodies[3],
        render: {
          type: "line",
          anchors: false,
          strokeStyle: `#875638`,
          lineWidth: 7,
        },
        ...constraintOptionsTop,
      });
      Matter.World.add(engine.world, constraint);

      for (let i = 4; i < bodies.length; i++) {
        console.log(bodies[i]);
        const constraint = Matter.Constraint.create({
          bodyA: bodies[i - 1],
          bodyB: bodies[i],
          render: {
            type: "line",
            anchors: false,
            strokeStyle: `#875638`,
            lineWidth: 7,
          },
          ...constraintOptions,
        });

        Matter.World.add(engine.world, constraint);
      }
    }

    if (screenSize.current && screenSize.current <= 900) {
      createTextBodiesFromString("SHAUNN", 100);
      spawnLastNameWithDelayMobile();
      createMobileConstraints();
    } else {
      createTextBodiesFromString("SHAUN");
      spawnLastNameWithDelay();
      createDesktopConstraints();
    }

    // Create constraints to chain the letters to the ceiling

    Matter.World.add(engine.world, bodies);

    if (screenSize.current > 1200) {
      const mouse = Mouse.create(canvas as HTMLElement);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

      Matter.World.add(engine.world, mouseConstraint);
    }

    let matterjsRunner: Matter.Runner;

    const handleImageLoad = () => {
      setIsLoaded(true);
      matterjsRunner.enabled = true;
    };

    const backgroundImage = new Image();
    backgroundImage.src = "/climbingWall.png";
    backgroundImage.onload = handleImageLoad;

    matterjsRunner = Matter.Runner.run(engine);
    Matter.Render.run(render);

    matterjsRunner.isFixed = true;
    if (screenSize.current < 900) {
      matterjsRunner.delta = 1000 / 20;
    }
    matterjsRunner.enabled = false;

    Matter.Events.on(matterjsRunner, "afterTick", updateFrameData);

    function updateFrameData(e: any): void {
      console.log(e);
      matterRunData.current = e.timestamp;
    }

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      clearInterval(marqueeInterval);
      window.removeEventListener("wheel", handleMouseWheel);
      let textElements = document.getElementsByClassName(
        "canvasControlledElement"
      );
      while (textElements.length > 0) {
        textElements[0].remove();
      }
    };
  }, []);

  return (
    <div className="bg-slate-800">
      {isLoaded ? null : (
        <div className="flex items-center justify-center h-screen w-screen bg-slate-800">
          <ClimbingBoxLoader color="#36d7b7" size={60} />
        </div>
      )}
      <div className="bg-slate-800" hidden={!isLoaded}>
        <div className="bg-slate-800 flex flex-col h-screen overflow-hidden">
          <div
            className="canvas-container gradient-opacity h-screen bg-cover bg-no-repeat bg-center bg-fixed"
            style={{
              backgroundImage: " url(/climbingWall.png)",
            }}
          >
            <canvas
              ref={canvasRef}
              className="md:pointer-events-auto "
            ></canvas>
          </div>
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
        <div className=" h-80 bg-slate-800 bg-cover bg-no-repeat bg-center bg-fixed">
          <ContactMe />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}
