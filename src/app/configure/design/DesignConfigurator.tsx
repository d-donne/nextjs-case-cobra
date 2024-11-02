"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Switch } from "@/components/ui/switch";
import { cn, formatPrice } from "@/lib/utils";
import NextImage from "next/image";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import HandleComponent from "@/components/HandleComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator";
import { RadioGroup } from "@headlessui/react";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BASE_PRICE } from "@/config/products";

type DesignConfiguratorProps = {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
};
const DesignConfigurator = ({ configId, imageUrl, imageDimensions }: DesignConfiguratorProps) => {
  const height = imageDimensions.height < 500 ? imageDimensions.height : imageDimensions.height / 4;
  const width = imageDimensions.width < 500 ? imageDimensions.width : imageDimensions.width / 4;

  const [croppedDimension, setCroppedDimension] = useState({ width, height });

  let pos_x = -40;
  let pos_y = 175;

  const [croppedPosition, setCroppedPosition] = useState({ x: pos_x, y: pos_y });

  const [aspectLock, setAspectLock] = useState(false);
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS)[number]
    material: (typeof MATERIALS.options)[number]
    finish: (typeof FINISHES.options)[number]
  }>({
    color: COLORS[0],
    model: MODELS[MODELS.length - 1],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  console.log("dimension: ", croppedDimension, "position: ", croppedPosition, "aspectratio: ", aspectLock);
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const ContainerRef = useRef<HTMLDivElement>(null);

  const saveConfiguration = async () => {
    try {
      const {} = phoneCaseRef.current!.getBoundingClientRect();
    }
    catch (e) {

    }
  }

  return (
    <div className="relative my-20 pb-2 grid grid-cols-1 lg:grid-cols-3">
      <div ref={ContainerRef} className="relative overflow-hidden h-[37.5rem] col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed pb-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="absolute bottom-0 h-fit right-0 md:right-1 sm:top-1 px-2 py-1 z-[50] bg-slate-50 text-neutral-500 rounded-xl flex gap-2 items-center">
          <Switch onCheckedChange={() => setAspectLock(!aspectLock)}  id="aspectLock" />
          <label htmlFor="aspectLock">Lock Aspect Ratio</label>
        </div>

        <div className="relative w-60 bg-opacity-50  aspect-[896/1831]">
          <AspectRatio ratio={896 / 1831} ref={phoneCaseRef} className="relative aspect-[891/1831]">
            <NextImage alt="phone" fill src="/phone-template.png" className="pointer-events-none z-50  select-none" />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] right-[3px] top-px bottom-px rounded-[32px] shadow-[0_0_0_999px_rgba(229,231,235,0.6)]" />
          <div className={cn("absolute inset-0 left-[3px] rigth-[3px] top-px bottom-px rounded-[32px] ", `bg-${options.color.tw}`)} />

          <Rnd
            default={{ x: pos_x, y: pos_y, width: width, height: height }}
            className="z-40 opacity-95 border-[3px] border-primary"
            lockAspectRatio={aspectLock}
            resizeHandleComponent={{
              topLeft: <HandleComponent />,
              topRight: <HandleComponent />,
              bottomLeft: <HandleComponent />,
              bottomRight: <HandleComponent />,
            }}
            onResizeStop={(_, __, ref, ___, { x, y }) => {
              setCroppedDimension({
                width: parseInt(ref.style.width.slice(0, -2)),
                height: parseInt(ref.style.height.slice(0, -2)),
              })
              setCroppedPosition({x,y})
            }}
            onDragStop={(_, { x, y }) => {
              setCroppedPosition({x,y})
            }}
          >
            <div className="relative size-full">
              <NextImage src={imageUrl} alt="custom case image" fill className="pointer-events-none opacity-100" />
            </div>
          </Rnd>
        </div>
      </div>

      <div className="h-[37.5rem] flex flex-col col-span-full lg:col-span-1 bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div aria-hidden className="absolute h-12 z-10 inset-x-0 bottom-0 bg-gradient-to-t from-white pointer-events-none" />

          <div className="px-8 pt-8  pb-12">
            <h2 className="tracking-tight font-bold text-3xl sticky top-0 bg-white z-20">Customize your case</h2>

            <div className="w-full h-px bg-zinc-100 my-6" />
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup value={options.color} onChange={(val) => setOptions((prev) => ({ ...prev, color: val }))}>
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.value}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            "relative -mt-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                            { [`border-${color.tw}`]: active || checked }
                          )
                        }>
                        <span className={cn(`bg-${color.tw}`, "size-8 rounded-full border border-black border-opacity-10")}></span>
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
                <div className="flex flex-col relative gap-3 w-full">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full flex items-center justify-between">
                        {options.model.label}
                        <ChevronsUpDown className="shrink-0 size-4 ml-2 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.map((model) => (
                        <DropdownMenuItem
                          key={model.value}
                          className={cn("flex text-sm gap-1 w-full items-center p-1.5 cursor-default hover:bg-zinc-100", {
                            "bg-zinc-100": model.value === options.model.value,
                          })}
                          onClick={() => setOptions((prev) => ({ ...prev, model }))}>
                          <Check className={cn("mr-2 size-4", model.value === options.model.value ? "opacity-100" : "opacity-0")} />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
                  <RadioGroup key={name} value={options[name]} onChange={(val) => setOptions((prev) => ({ ...prev, [name]: val }))} >
                    <Label className="capitalize">{name}</Label>
                    <div className="mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <RadioGroup.Option key={option.label} value={option.value} className={({ active, checked }) => cn('relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between', {
                          'border-primary': active || checked,
                        })}>
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <RadioGroup.Label className='font-medium text-gray-900' as='span'>
                                {option.label}
                              </RadioGroup.Label>
                              {option.description && <RadioGroup.Description as='span' className='text-gray-500'><span className="block sm:inline">{option.description}</span></RadioGroup.Description>}
                            </span>
                          </span>

                          <RadioGroup.Label as='span' className="mt-2 flex text-sm sm:flex-col sm:ml-4 sm:text-right" >
                            {formatPrice(option.price)}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white mt-auto">
          <div className="h-px w-full bg-zinc-200" />
            <div className="size-full flex items-center justify-end">
              <div className="w-full flex items-center gap-6">
                <p className="whitespace-nowrap font-medium">{formatPrice(BASE_PRICE + options.finish.price + options.material.price)}</p>
                <Button className="w-full">
                  Continue
                  <ArrowRight className="size-4 ml-1.5 inline" />
                </Button>
              </div>
            </div>
         
        </div>

      </div>
    </div>
  );
};

export default DesignConfigurator;
