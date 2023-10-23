import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "~/config/site";
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import {
  DiscordIcon,
  GithubIcon,
  SearchIcon,
  TwitterIcon,
} from "~/shared/icons/icons";
import { ThemeSwitch } from "~/shared/themes/theme-switch";

const NavBar = () => {
  const router = useRouter();
  const session = useSession();

  // console.log('session', session);

  const handleLoginClick = async () => {
    if (
      session &&
      session.status === "authenticated" &&
      session?.data?.user?.id
    ) {
      await router.push("/verificationCheck");
    } else {
      await router.push("/login");
    }
  };

  const handleSignUpClick = async () => {
    if (
      session &&
      session.status === "authenticated" &&
      session?.data?.user?.id
    ) {
      await router.push("/verificationCheck");
    } else {
      await router.push("/register");
    }
  };

  const handleLogoClick = async () => {
    await router.push("/");
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
      }
      type="search"
    />
  );

  return (
    <header className="py-3">
      <NextUINavbar maxWidth="xl" position="sticky" isBordered>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="max-w-fit gap-3">
            <NextLink
              className="flex items-center justify-start gap-1"
              href="/"
            >
              <Avatar src="/SKLogo.png" className="h-10 w-10" />
              <p className="font-bold text-inherit">Sangguniang Kabataan</p>
            </NextLink>
          </NavbarBrand>
          <ul className="ml-2 hidden justify-start gap-4 lg:flex">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:font-medium data-[active=true]:text-primary",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden basis-1/5 sm:flex sm:basis-full"
          justify="end"
        >
          <NavbarItem className="hidden gap-4 sm:flex">
            <Link
              isExternal
              href={siteConfig.links.twitter}
              aria-label="Twitter"
            >
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              href={siteConfig.links.discord}
              aria-label="Discord"
            >
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link isExternal href={siteConfig.links.github} aria-label="Github">
              <GithubIcon className="text-default-500" />
            </Link>
            <ThemeSwitch />
            <Button color="primary" onClick={handleLoginClick}>
              Login
            </Button>
            <Button color="danger" onClick={handleSignUpClick}>
              Register
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={index}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </header>
  );
};

export default NavBar;
