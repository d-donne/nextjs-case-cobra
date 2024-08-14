"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./Phone";

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

interface reviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

const Review = ({ imgSrc, className, ...props }: reviewProps) => {
  const POSSIBLE_ANIMATION_DELAYS = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];

  const animationDelay = POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)];
  return (
    <div
      className={cn(
        "rounded-[2.25rem] animate-fade-in  z-50 bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}>
      <Phone imgSrc={imgSrc} />
    </div>
  );
};

type reviewColumnProps = {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
};

const ReviewColumn = ({ reviews, className, reviewClassName, msPerPixel = 0 }: reviewColumnProps) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);
    return () => resizeObserver.disconnect();
  }, []);


  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-2 py-4 ", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, index) => (
        <Review key={index} imgSrc={imgSrc} className={reviewClassName?.(index % reviews.length)} />
      ))}
    </div>
  );
};

const ReviewGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);

  const col1 = columns[0];
  const col2 = columns[1];
  const col3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 md:grid-cols-2 lg:grid-cols-3">
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...col1, ...col3.flat(), ...col2]}
            reviewClassName={(index) => cn({ "md:hidden": index >= col1.length + col3[0].length, "lg:hidden": index > col1.length })}
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...col2, ...col3[1]]}
            className="hidden md:block"
            reviewClassName={(index) => (index >= col2.length ? "lg:hidden" : "")}
            msPerPixel={15}
          />
          <ReviewColumn reviews={[...col3.flat()]} className="hidden md:block" msPerPixel={10} />
        </>
      )}

      <div className="pointer-events-none bg-gradient-to-b from-slate-100 h-32 absolute inset-x-0 top-0" />
      <div className="pointer-events-none bg-gradient-to-t from-slate-100 h-32 absolute inset-x-0 bottom-0" />
    </div>
  );
};

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl ">
      <img aria-hidden src="/what-people-are-buying.png" alt="" role="presentation" className="absolute select-none hidden xl:block -left-32 top-1/3" />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
};

export default Reviews;
