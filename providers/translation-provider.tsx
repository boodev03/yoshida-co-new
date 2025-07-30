/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface TranslationsContextType {
  dict: Dictionary;
  locale: "en" | "ja";
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(
  undefined
);

interface TranslationsProviderProps {
  children: ReactNode;
  dict: Dictionary;
  locale: "en" | "ja";
}

export function TranslationsProvider({
  children,
  dict,
  locale,
}: TranslationsProviderProps) {
  return (
    <TranslationsContext.Provider value={{ dict, locale }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);

  if (!context) {
    throw new Error(
      "useTranslations must be used within a TranslationsProvider"
    );
  }

  const { dict, locale } = context;

  // Helper function để access nested properties với type safety
  const t = <T extends keyof Dictionary>(section: T): Dictionary[T] => {
    return dict[section];
  };

  // Helper function cho nested access với path string
  const getNestedValue = (path: string): string => {
    const keys = path.split(".");
    let value: any = dict;

    for (const key of keys) {
      value = value?.[key];
    }

    if (typeof value !== "string") {
      console.warn(`Translation not found for path: ${path}`);
      return path;
    }

    return value;
  };

  // Helper function với interpolation
  const interpolate = (
    template: string,
    values: Record<string, string | number>
  ): string => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return values[key]?.toString() || match;
    });
  };

  const tPath = (
    path: string,
    interpolationValues?: Record<string, string | number>
  ): string => {
    const value = getNestedValue(path);
    return interpolationValues
      ? interpolate(value, interpolationValues)
      : value;
  };

  // Convenience methods for common sections
  const common = t("common");
  const navigation = t("navigation");
  const home = t("home");
  const company = t("company");
  const caseData = t("case");
  const technology = t("technology");
  const factoryAndQuality = t("factoryAndQuality");
  const equipment = t("equipment");
  const quality = t("quality");
  const news = t("news");
  const recruit = t("recruit");
  const careerPath = t("careerPath");

  return {
    dict,
    locale,
    t,
    getNestedValue,
    tPath,
    // Direct access to main sections
    common,
    navigation,
    home,
    company,
    case: caseData,
    technology,
    factoryAndQuality,
    equipment,
    quality,
    news,
    recruit,
    careerPath,
  };
}
