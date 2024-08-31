"use client";

import { models, sizes } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "@/utils";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import ModelView from "@/components/ModelView";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Model = () => {
  const [model, setModel] = useState({
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  });
  const [size, setSize] = useState("small");

  const smallControlRef = useRef<any>();
  const largeControlRef = useRef<any>();

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useGSAP(() => {
    gsap.to("#model_title", {
      opacity: 1,
      y: 0,
      scrollTrigger: "#model_title",
      duration: 2,
    });
  }, []);

  useEffect(() => {
    if (size === "large") {
      gsap.to("#view1", {
        transform: `translateX(-100%)`,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          smallControlRef.current?.reset();
        },
      });
      gsap.to("#view2", {
        transform: `translateX(-100%)`,
        duration: 2,
        ease: "power2.inOut",
      });
    } else {
      gsap.to("#view1", {
        transform: `translateX(0%)`,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          largeControlRef.current?.reset();
        },
      });
      gsap.to("#view2", {
        transform: `translateX(0%)`,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  }, [size]);

  return (
    <section id="iphone" className="common-padding">
      <div className="screen-max-width">
        <h1 id="model_title" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              type={"view1"}
              index={1}
              size={size}
              model={model}
              setRotationState={setSmallRotation}
              controlRef={smallControlRef}
            />
            <ModelView
              type={"view2"}
              index={2}
              size={size}
              model={model}
              setRotationState={setLargeRotation}
              controlRef={largeControlRef}
            />
            <Canvas
              className={"w-full h-full"}
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
              //@ts-ignore
              eventSource={
                typeof document !== "undefined"
                  ? document.getElementById("root")
                  : null
              }
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
