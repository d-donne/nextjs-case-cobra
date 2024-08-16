"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { useState } from "react";
import { Rnd } from "react-rnd";
import HandleComponent from "@/components/HandleComponent";

type DesignConfiguratorProps = {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
};
const DesignConfigurator = ({ configId, imageUrl, imageDimensions }: DesignConfiguratorProps) => {
  const height = imageDimensions.height < 500 ? imageDimensions.height : imageDimensions.height / 4;
  const width = imageDimensions.width < 500 ? imageDimensions.width : imageDimensions.width / 4;

  const [aspectLock, setAspectLock] = useState(true);

  return (
    <div className="relative my-20 pb-2 grid grid-cols-3">
      <div className="relative overflow-hidden h-[37.5rem] col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed pb-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="absolute bottom-0 h-fit right-0 md:right-1 sm:top-1 px-2 py-1 z-[50] bg-slate-50 text-neutral-500 rounded-xl flex gap-2 items-center">
          <Switch onCheckedChange={() => setAspectLock(!aspectLock)} id="aspectLock" className="" />
          <label htmlFor="aspectLock">Lock Aspect Ratio</label>
        </div>
        <div className="relative w-60 bg-opacity-50  aspect-[896/1831]">
          <AspectRatio ratio={896 / 1831} className="relative aspect-[891/1831]">
            <NextImage alt="phone" fill src="/phone-template.png" className="pointer-events-none z-50  select-none" />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] right-[3px] top-px bottom-px rounded-[32px] shadow-[0_0_0_999px_rgba(229,231,235,0.6)]" />
          <div className={cn("absolute z-40 left-[3px] right-[3px] bottom-px top-px rounded-[32px]", `bg-white`)} />

          <Rnd
            default={{ x: 150, y: 205, width: width, height: height }}
            className="z-40 opacity-95"
            lockAspectRatio={aspectLock}
            resizeHandleComponent={{
              topLeft: <HandleComponent />,
              topRight: <HandleComponent />,
              bottomLeft: <HandleComponent />,
              bottomRight: <HandleComponent />,
            }}>
            <div className="relative size-full">
              <NextImage src={imageUrl} alt="custom case image" fill className="pointer-events-none opacity-100" />
            </div>
          </Rnd>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
