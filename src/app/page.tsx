import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { Check, Star } from "lucide-react";
import { USERS } from "../../constants";
import Phone from "@/components/Phone";
const ListItem = ({ text }: { text: string }) => {
  return (
    <li className="flex gap-1.5 items-center text-left">
      <Check className="h-5 w-5 shrink-0 text-green-600" />
      {text}
    </li>
  );
};

export default function Home() {
  return (
    <div className="">
      <section className="bg-slate-100">
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start ">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <img
                  src="/snake-1.png"
                  alt="snake"
                  className="w-full h-auto"
                />
              </div>
              <h1 className="relative  w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">one of one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone.
              </p>

              <ul className="mt-8 space-y-2 font-medium text-left flex flex-col sm:items-start">
                <ListItem text="High quality, durable material" />
                <ListItem text="5 year print guarantee" />
                <ListItem text="Modern iPhone models supported" />
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  {USERS.map((user) => (
                    <Image
                      src={user}
                      key={user}
                      alt="user"
                      width={40}
                      height={40}
                      className="inline-block rounded-full ring-2 ring-slate-100"
                    />
                  ))}
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    {Array(5)
                      .fill(5)
                      .map((_, index) => (
                        <Star
                          key={index}
                          className="text-green-600 fill-green-600"
                        />
                      ))}
                  </div>
                  <p className=""><span className="font-semibold">1.543k</span> Happy Customers </p>
                </div>

              </div>
            </div>
          </div>

          <div className="w-full h-fit col-span-full lg:col-span-1 flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20">
            <div className="relative md:max-w-xl">
              <img src="/your-image.png" alt="your image arrow" className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block" />
              <img src="/line.png" alt="line" className="absolute w-20 -left-6 -bottom-6 select-none" />
              <Phone imgSrc="/testimonials/1.jpg" className="w-64"/>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
