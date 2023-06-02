"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter, { Mouse, MouseConstraint } from "matter-js";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { getXValueInRange } from "@/utils/UtilFunctions";

import CharS from "../public/char-s.svg";
import PointingHand from "../public/pointing-hand.svg";
import BioCard from "@/components/BioCard";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const devStrictModeFix = useRef(false);
  let handOpacity = useRef(-1);
  let animDelay = useRef(true);
  let screenSize = useRef(0);

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

  const animTimeout = setTimeout(() => {
    animDelay.current = false;
    handOpacity.current = 1;
  }, 7000);

  const marqueeInterval = setInterval(() => {
    if (animDelay.current == true) {
      return;
    }
    let randomIndex = Math.floor(Math.random() * marqueeLines.length);
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * marqueeLines.length);
    }
    setCurrentLine(marqueeLines[randomIndex]);
    setCurrentIndex(randomIndex);
  }, 3000);

  useEffect(() => {
    document.body.classList.add("hide-scrollbar");

    screenSize.current = window.innerWidth;

    if (screenSize.current < 900) {
      const animTimeoutFaster = setTimeout(() => {
        animDelay.current = false;
        handOpacity.current = 1;
      }, 3000);
    }

    if (devStrictModeFix.current == false) {
      devStrictModeFix.current = true;
      return;
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
      fontsize?: number
    ) {
      console.log(window.innerWidth);
      const fontSize = fontsize ? fontsize : 250;
      const textElement = document.createElement("div");
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
      document.body.appendChild(textElement);

      const width = textElement.clientWidth;
      const height = textElement.clientHeight;
      const body = Matter.Bodies.rectangle(x, y, width, height, {
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

      const updateTextPosition = () => {
        let previousHeight = parseFloat(textElement.style.top);
        const position = body.position;
        textElement.style.left = `${position.x - width / 2}px`;
        textElement.style.top = `${position.y - height / 2}px`;
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
          fontSize ? fontSize : -300
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
      window.innerHeight / 1.5,
      window.innerWidth,
      10,
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
    bodies.push(floor, ceiling);

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
      }, 7000); // Delay of 5000 milliseconds (5 seconds)
    }

    if (screenSize.current <= 900) {
      createTextBodiesFromString("SHAUN", 100);
      spawnLastNameWithDelay(25);
    } else {
      createTextBodiesFromString("SHAUN");
      spawnLastNameWithDelay();
    }

    // Create constraints to chain the letters to the ceiling
    const constraintOptions = {
      stiffness: 0.0001,
      damping: 0.01,
      length: window.innerHeight / 10,
    };

    for (let i = 2; i < bodies.length; i++) {
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
            return { x: 0, y: -55 };
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

    Matter.World.add(engine.world, bodies);

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

    Matter.Runner.run(engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      clearInterval(marqueeInterval);
      window.removeEventListener("wheel", handleMouseWheel);
    };
  }, []);

  return (
    <div className="bg-slate-800">
      <div className="bg-slate-800 flex flex-col h-screen overflow-hidden">
        <div
          className="canvas-container gradient-opacity h-screen bg-cover bg-no-repeat bg-center bg-fixed"
          style={{
            backgroundImage: " url(/climbingWall.png)",
          }}
        >
          <canvas ref={canvasRef}></canvas>
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
    </div>
  );
}
