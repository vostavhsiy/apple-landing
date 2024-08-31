"use client";

import { hightlightsSlides } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { pauseImg, playImg, replayImg } from "@/utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoDivRef = useRef([]);
  const videoSpanRef = useRef([]);

  const [video, setVideo] = useState({
    startPlay: false,
    isPlaying: false,
    isEnd: false,
    videoId: 0,
    isLastVideo: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isPlaying, startPlay, isEnd, videoId, isLastVideo } = video;

  const handleLoadMetadata = (el) => setLoadedData((pre) => [...pre, el]);

  useGSAP(() => {
    gsap.to(".video", {
      scrollTrigger: {
        trigger: ".video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({ ...pre, startPlay: true, isPlaying: true }));
      },
    });
  }, []);

  useGSAP(() => {
    gsap.to(".slide", {
      transform: `translateX(${-100 * videoId}%)`,
      ease: "power2.inOut",
      duration: 2,
    });
  }, [videoId]);

  useEffect(() => {
    if (loadedData.length < hightlightsSlides.length) return;
    if (!isPlaying) {
      videoRef.current[videoId].pause();
      return;
    }
    if (startPlay) videoRef.current[videoId].play();
  }, [videoId, startPlay, loadedData, isPlaying]);

  useEffect(() => {
    const span = videoDivRef.current;
    if (!span[videoId]) return;
    let anim = gsap.to(span[videoId], {
      onUpdate: () => {
        gsap.to(span[videoId], {
          width:
            window.innerWidth < 760
              ? "10vw" // mobile
              : window.innerWidth < 1200
                ? "10vw" // tablet
                : "4vw", // laptop
        });

        let process = Math.ceil(anim.progress() * 100);
        gsap.to(videoSpanRef.current[videoId], {
          width: `${process}%`,
          backgroundColor: "white",
        });
      },
      onComplete: () => {
        gsap.to(span[videoId], {
          width: "12px",
        });
        gsap.to(videoSpanRef.current[videoId], {
          backgroundColor: "#afafaf",
        });
      },
    });
    const animUpdate = () => {
      anim.progress(
        videoRef.current[videoId].currentTime /
          hightlightsSlides[videoId].videoDuration,
      );
    };

    if (isPlaying) {
      gsap.ticker.add(animUpdate);
    } else {
      gsap.ticker.remove(animUpdate);
    }
  }, [videoId, startPlay]);

  const handleProcess = (type: string, index?: number) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, videoId: pre.videoId + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({
          ...pre,
          videoId: 0,
          isPlaying: true,
          isLastVideo: false,
        }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={"flex items-center"}>
        {hightlightsSlides.map((slide, index) => {
          return (
            <div className={"slide sm:pr-10 pr-20"} key={slide.id}>
              <div className={"video-carousel_container"}>
                <div
                  className={
                    "w-full h-full rounded-3xl overflow-hidden bg-black flex-center"
                  }
                >
                  <video
                    ref={(instance) => {
                      videoRef.current[index] = instance;
                    }}
                    muted
                    preload="auto"
                    className={"video pointer-events-none"}
                    onLoadedMetadata={handleLoadMetadata}
                    onEnded={() =>
                      handleProcess(index === 3 ? "video-last" : "video-end")
                    }
                  >
                    <source src={slide.video} />
                  </video>
                </div>
                <div className="absolute top-12 left-[5%] z-10">
                  {slide.textLists.map((text, i) => (
                    <p key={i} className="md:text-2xl text-xl font-medium">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => {
                videoDivRef.current[i] = el;
              }}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => {
                  videoSpanRef.current[i] = el;
                }}
              />
            </span>
          ))}
        </div>

        <button
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
