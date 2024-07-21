import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const NavLink = ({ href, label }: { href: string; label: string;}) => {
  return (
    <Link
      href={href}
      className={buttonVariants({ variant: "ghost", size: "sm" })}
    >
      {label} 
    </Link>
  )
};

const NavBar = async () => {
  const {getUser} = getKindeServerSession();
  const user = await getUser(); 

  const { getPermission } = getKindeServerSession();
  const role = await getPermission("adminP");
  const isAdmin = role?.isGranted;
  
  console.log(isAdmin)
 
  // const isAdmin = process.env.ADMIN_EMAIL

  return (
    <nav className="sticky z-[999] h-14 inset-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="flex z-40 font-semibold"
          >
            case<span className="text-green-600">cobra</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            
            {user ? (
              <>
                <p className="hidden text-sm sm:block">Hello, {user.given_name}😊</p>
                <NavLink
                  href="/api/auth/logout"
                  label="Sign Out"
                />

                {isAdmin && (
                  <NavLink
                    href="/admin"
                    label="Dashboard ✨"
                  />
                )}

                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  href="/api/auth/register"
                  label="Sign Up"
                />

                <NavLink
                  href="/api/auth/login"
                  label="Sign In"
                />

                <div className="h-8 w-0.5 bg-zinc-200" />
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create Case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
