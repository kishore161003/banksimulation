"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogIn, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUserDataStore } from "@/utils/store";
import { Button } from "./ui/button";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(true);
  const routeName = usePathname();
  const router = useRouter();
  // console.log(routeName);
  const user = useUserDataStore((state) => state.user);
  const setUser = useUserDataStore((state) => state.setUser);
  var isAdmin = false;
  if (user) {
    isAdmin = user.isAdmin;
  }

  const profile = user && (user?.isAdmin ? "admin" : `user/${user.accNo}`);

  return (
    routeName != "/login" &&
    routeName != "/signin" && (
      <div className="flex  justify-between align-middle bg-white bg-opacity-80 px-16 py-5  sticky top-0 left-0 right-0 backdrop-blur-lg text-black">
        <div className="flex gap-12 lg:gap-28">
          <div className="flex gap-2 text-lg">
            <img
              src="/logo.png"
              alt="logo"
              className="object-scale-down w-10 h-10 hover:cursor-pointer"
              onClick={() => router.push("/")}
            />
            <div
              className="text-gray-900 text-3xl font-semibold hover:cursor-pointer p-0.5"
              onClick={() => router.push("/")}
            >
              Estrellas Bank
            </div>
          </div>

          {user ? (
            isAdmin ? (
              <div>
                <div className="flex gap-2 hidden md:hidden sm:hidden lg:block">
                  <Button variant="link" onClick={() => router.push("/admin")}>
                    Dashboard
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => router.push("/admin/users")}
                  >
                    Users
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => router.push("/admin/transactions")}
                  >
                    Transactions
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => router.push("/admin/create-requests")}
                  >
                    Create Requests
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => router.push("/admin/delete-requests")}
                  >
                    Delete Requests
                  </Button>
                </div>
                <div className="lg:hidden"></div>
              </div>
            ) : (
              <div className="flex justify-center align-middle gap-4 p-2.5 lg:gap-10 max-lg:text-sm font-semibold max-lg:hidden">
                <div
                  className="hover:cursor-pointer"
                  onClick={() => router.push("/withdraw")}
                >
                  Withdraw
                </div>
                <div
                  className="hover:cursor-pointer"
                  onClick={() => router.push("/deposit")}
                >
                  Deposit
                </div>
                <div
                  className="hover:cursor-pointer"
                  onClick={() => router.push("/transfer")}
                >
                  Transfer
                </div>
                <div
                  className="hover:cursor-pointer"
                  onClick={() => router.push("/transactions")}
                >
                  Transaction
                </div>
              </div>
            )
          ) : null}
        </div>
        {user ? (
          <div className=" max-lg:hidden lg:block flex gap-8 max-lg:text-sm">
            {!isAdmin && (
              <div className="flex gap-8">
                <div
                  className="hover:cursor-pointer font-semibold mt-2.5"
                  onClick={() => router.push(profile)}
                >
                  Profile
                </div>
                <div
                  className="font-semibold rounded-xl  border-gray-900 border mt-1.5 px-3 py-1 hover:cursor-pointer"
                  onClick={() => {
                    setUser(null);
                    router.push("/");
                  }}
                >
                  Logout
                </div>
              </div>
            )}
            {isAdmin && (
              <div
                className="font-semibold rounded-xl  border-gray-900 border mt-1.5 px-3 py-1 hover:cursor-pointer"
                onClick={() => {
                  setUser(null);
                  router.push("/");
                }}
              >
                Logout
              </div>
            )}
          </div>
        ) : (
          <div>
            <button
              className="font-semibold rounded-xl max-md:hidden  border-gray-900 border mt-1.5 px-4 py-1 hover:cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>
        )}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:border-none mt-2.5">
              <Menu className="cursor-pointer" />
            </DropdownMenuTrigger>
            {user ? (
              isAdmin ? (
                <DropdownMenuContent sideOffset={4}>
                  <DropdownMenuItem>
                    <DropdownMenuLabel
                      className="cursor-pointer"
                      onClick={() => {
                        router.push("/admin");
                      }}
                    >
                      Dashboard
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DropdownMenuLabel
                      className="cursor-pointer"
                      onClick={() => {
                        router.push("/admin/users");
                      }}
                    >
                      Users
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DropdownMenuLabel
                      className="cursor-pointer"
                      onClick={() => {
                        router.push("/admin/transactions");
                      }}
                    >
                      Transactions
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DropdownMenuLabel
                      className="cursor-pointer"
                      onClick={() => {
                        router.push("/admin/create-requests");
                      }}
                    >
                      Create Requests
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DropdownMenuLabel
                      className="cursor-pointer"
                      onClick={() => {
                        router.push("/admin/delete-requests");
                      }}
                    >
                      Delete Requests
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-400 w-[90%]" />
                  <DropdownMenuItem>
                    <DropdownMenuLabel
                      className="cursor-pointer"
                      onClick={() => {
                        setUser(null);
                        router.push("/");
                      }}
                    >
                      Logout
                    </DropdownMenuLabel>
                    <DropdownMenuShortcut>
                      <LogOut className="stroke-black" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent sideOffset={4}>
                  <DropdownMenuItem>
                    <DropdownMenuLabel
                      className="cursor-pointer"
                      onClick={() => router.push(profile)}
                    >
                      Profile
                    </DropdownMenuLabel>
                    <DropdownMenuShortcut>
                      <User className="stroke-black" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DropdownMenuLabel className="cursor-pointer">
                      WithDraw
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DropdownMenuLabel className="cursor-pointer">
                      Deposit
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DropdownMenuLabel className="cursor-pointer">
                      Transfer
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DropdownMenuLabel
                      className="cursor-pointer"
                      onClick={() => router.push("/transactions")}
                    >
                      Transaction
                    </DropdownMenuLabel>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-400 w-[90%]" />
                  <DropdownMenuItem>
                    <DropdownMenuLabel
                      className="cursor-pointer"
                      onClick={() => {
                        setUser(null);
                        router.push("/");
                      }}
                    >
                      Logout
                    </DropdownMenuLabel>
                    <DropdownMenuShortcut>
                      <LogOut className="stroke-black" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )
            ) : (
              <DropdownMenuContent sideOffset={4}>
                <DropdownMenuItem>
                  <DropdownMenuLabel
                    className="cursor-pointer"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </DropdownMenuLabel>
                  <DropdownMenuShortcut>
                    <LogIn className="stroke-black" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </div>
    )
  );
};

export default NavBar;
