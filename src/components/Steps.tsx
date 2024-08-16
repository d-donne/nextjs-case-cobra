"use client";

import { cn } from "@/lib/utils";
import { url } from "inspector";
import { usePathname } from "next/navigation";
import React from "react";

const Steps = () => {
  const pathname = usePathname();
  const STEPS = [
    {
      name: "Step 1: Image",
      description: "Choose an image for your phone case",
      url: "/upload",
    },
    {
      name: "Step 2: Customize your design",
      description: "Make the case yours",
      url: "/design",
    },
    {
      name: "Step 3: Summary",
      description: "Review your final design",
      url: "/preview",
    },
  ];

  return (
    <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-x lg:border-gray-200">
      {STEPS.map((step, index) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(index+ 1).some((step) => pathname.endsWith(step.url));

        return (
          <li key={index} className="relative overflow-hidden lg:flex-1">
            <div className="flex items-center">
              <span
                className={cn("absolute top-0 left-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full", {
                  "bg-zinc-700": isCurrent,
                  "bg-primary": isCompleted,
                })}
                aria-hidden
              />
              <span className={cn("flex items-center px-6 py-4 text-sm font-medium", index != 0 && "lg:p-9")}>
                <span className="flex-shrink-0">
                  <img
                    src={`/snake-${index + 1}.png`}
                    alt=""
                    aria-hidden
                    className={cn("flex size-20 object-contain items-center justify-center", {
                      "border-none": isCompleted,
                      "border-zinc-700": isCurrent,
                    })}
                  />
                </span>
              </span>
              <span className="text-sm h-full min-w-0 flex flex-col justify-center mt-0.5">
                <span className={cn("font-semibold text-zinc-700", { "text-primary": isCompleted, "text-zinc-700": isCurrent })}>
                  {step.name}
                </span>
                <span className="text-zinc-500">{step.description}</span>
              </span>

              {index !== 0 && (
                <div className="absolute inset-0 hidden w-3 lg:block">
                  <svg className="h-full w-full text-gray-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
                    <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
