// import React, { useEffect, useRef } from "react";
// import Matter from "matter-js";
// import { getXValueInRange } from "@/utils/UtilFunctions";

// // NOTES - To fix
// // Extracting Canvas causes issue with opacity of background image

// const CanvasComponent = ({ screenSize }: { screenSize: number }) => {
//   const devStrictModeFix = useRef(!(process.env.NODE_ENV === "development"));
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const engine = Matter.Engine.create();
//     const render = Matter.Render.create({
//       canvas: canvas ? canvas : undefined,
//       engine: engine,
//       options: {
//         width: window.innerWidth,
//         height: window.innerHeight,
//         background: "transparent",
//         wireframeBackground: "transparent",
//         wireframes: false,
//       },
//     });

//     // Create text object and Matter body for each character
//     function createTextObject(
//       text: string,
//       x: number,
//       y: number,
//       fontSize = 250
//     ) {
//       const textElement = document.createElement("div");
//       textElement.style.position = "absolute";
//       textElement.style.left = `${x}px`;
//       textElement.style.top = `${y}px`;
//       textElement.style.fontSize = `${fontSize}px`;
//       textElement.style.color = "black";
//       textElement.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
//       textElement.style.pointerEvents = "none";
//       textElement.innerHTML = text;
//       document.body.appendChild(textElement);

//       const width = textElement.clientWidth;
//       const height = textElement.clientHeight;
//       const body = Matter.Bodies.rectangle(x, y, width, height, {
//         isStatic: false,
//         render: { visible: false },
//         frictionAir: 0.08 + Math.random() * 0.06,
//         label: text,
//         inertia: Infinity,
//         collisionFilter: {
//           category: 0x0002,
//           mask: 0x0001,
//         },
//       });

//       const updateTextPosition = () => {
//         const position = body.position;
//         textElement.style.left = `${position.x - width / 2}px`;
//         textElement.style.top = `${position.y - height / 2}px`;
//       };

//       Matter.Events.on(engine, "afterUpdate", updateTextPosition);

//       return { body, textElement };
//     }

//     // Function to create text bodies from a given string
//     function createTextBodiesFromString(string: string, fontSize?: number) {
//       for (let i = 0; i < string.length; i++) {
//         const charXValue = getXValueInRange(
//           window.innerWidth / 10,
//           window.innerWidth - window.innerWidth / 10,
//           string.length,
//           i
//         );
//         const charText = createTextObject(
//           string[i],
//           charXValue,
//           -350,
//           fontSize ? fontSize : 300
//         );
//         bodies.push(charText.body);
//       }
//     }

//     const bodies:
//       | any[]
//       | Matter.Body[]
//       | Matter.Composite[]
//       | Matter.Constraint[]
//       | Matter.MouseConstraint[] = [];

//     const floor = Matter.Bodies.rectangle(
//       window.innerWidth / 2,
//       window.innerHeight / 1.5,
//       window.innerWidth,
//       10,
//       { isStatic: true, render: { visible: false } }
//     );
//     const ceiling = Matter.Bodies.rectangle(
//       window.innerWidth / 2,
//       0,
//       window.innerWidth,
//       10,
//       {
//         isStatic: true,
//         render: { visible: false },
//         collisionFilter: {
//           category: 0x0002,
//           mask: 0x0000,
//         },
//       }
//     );
//     bodies.push(floor, ceiling);

//     function spawnLastNameWithDelay(fontsize?: number) {
//       setTimeout(() => {
//         const surnameBody = createTextObject(
//           "Reilly",
//           window.innerWidth * 0.9,
//           -100,
//           fontsize ? fontsize : 50
//         );
//         surnameBody.body.frictionAir = 0.01;
//         surnameBody.body.restitution = 0.4;
//         surnameBody.body.force = !fontsize
//           ? { x: -0.15, y: 0 }
//           : { x: 0, y: 0 };

//         // Set collision filter for surnameBody
//         surnameBody.body.collisionFilter = {
//           category: 0x0002, // Collides with floor
//           mask: 0x0001, // Collides with everything except floor
//         };

//         Matter.World.add(engine.world, surnameBody.body);
//       }, 7000); // Delay of 5000 milliseconds (5 seconds)
//     }

//     if (screenSize && screenSize <= 900) {
//       console.log(screenSize);
//       createTextBodiesFromString("SHAUN", 100);
//       spawnLastNameWithDelay(25);
//     } else {
//       createTextBodiesFromString("SHAUN");
//       spawnLastNameWithDelay();
//     }

//     // Create constraints to chain the letters to the ceiling
//     const constraintOptions = {
//       stiffness: 0.0001,
//       damping: 0.01,
//       length: window.innerHeight / 10,
//     };

//     for (let i = 2; i < bodies.length; i++) {
//       const charXValue = getXValueInRange(
//         window.innerWidth / 10,
//         window.innerWidth - window.innerWidth / 10,
//         bodies.length - 2,
//         i
//       );
//       const attachPoint = () => {
//         let letter = bodies[i].label;
//         switch (letter) {
//           case "S":
//             return { x: 0, y: -55 };
//           case "H":
//             return { x: 0, y: 10 };
//           case "A":
//             return { x: 0, y: -55 };
//           // Rotation problems
//           case "U":
//             return { x: -45, y: -55 };
//           // case "U":
//           //   return { x: 0, y: 90 };
//           default:
//             return { x: 0, y: 0 };
//         }
//       };
//       const constraint = Matter.Constraint.create({
//         bodyA: ceiling,
//         pointA: { x: charXValue - window.innerWidth / 1.2, y: 0 },
//         bodyB: bodies[i],
//         pointB: attachPoint(),
//         render: {
//           type: "line",
//           anchors: false,
//           strokeStyle: `#875638`,
//           lineWidth: 7,
//         },
//         ...constraintOptions,
//       });

//       Matter.World.add(engine.world, constraint);
//     }

//     // Rest of the canvas functionality code...

//     Matter.World.add(engine.world, bodies);

//     const mouse = Matter.Mouse.create(canvas as HTMLElement);
//     const mouseConstraint = Matter.MouseConstraint.create(engine, {
//       mouse: mouse,
//       constraint: {
//         stiffness: 0.2,
//         render: {
//           visible: false,
//         },
//       },
//     });

//     Matter.World.add(engine.world, mouseConstraint);

//     Matter.Runner.run(engine);
//     Matter.Render.run(render);

//     return () => {
//       Matter.Render.stop(render);
//       Matter.Engine.clear(engine);
//     };
//   }, []);

//   return (
//     <div
//       className="canvas-container h-screen bg-cover bg-no-repeat bg-center bg-fixed z-10"
//       style={{
//         backgroundImage: " url(/climbingWall.png)",
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         className="lg:pointer-events-auto pointer-events-none z-20"
//       ></canvas>
//     </div>
//   );
// };

// export default CanvasComponent;
