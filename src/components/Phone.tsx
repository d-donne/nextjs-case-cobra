import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
  imgSrc: string;
}

const Phone = ({ className, imgSrc, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none none z-50 overflow-hidden ",
        className
      )}
      {...props}
    >
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        alt="phone"
        className="pointer-events-none z-50 select-none"
      />

      <div className="absolute -z-10 inset-0">
        <img src={imgSrc} alt="phone overlay" className="object-cover" />
      </div>
    </div>
  );
};

export default Phone;
