"use client";

import * as React from "react";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        themes={["light", "dark", "modern"]}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
