"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface BlogContextType {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
  initialCategory: string;
}

export const BlogProvider = ({ children, initialCategory }: BlogProviderProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);

  return (
    <BlogContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </BlogContext.Provider>
  );
};