// src/pages/index.ts
import React from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import { Utils } from "../utils/utils";

const modules = import.meta.glob("./*.tsx");

type Page = {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
};

export const pages: Page[] = [];

for (const path in modules) {
  // Contoh: "./About.tsx" -> "/about"
  const routePath =
    path === "./Home.tsx" ? "/" : "/" + Utils.camelToKebab(path.replace(/^\.\/|\.tsx$/g, ""));

  const component = React.lazy(modules[path] as any);

  pages.push({ path: routePath, component });
}

