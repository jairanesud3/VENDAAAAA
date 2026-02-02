import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanAIResponse(text: string): string {
  if (!text) return "";
  
  return text
    .replace(/\*\*/g, "") // Remove bold
    .replace(/###/g, "")  // Remove h3
    .replace(/##/g, "")   // Remove h2
    .replace(/#/g, "")    // Remove h1
    .replace(/__ /g, "")  // Remove italics/bold markers
    .replace(/\-\-\-/g, "") // Remove horizontal rules
    .replace(/> /g, "")   // Remove blockquotes
    .replace(/`/g, "")    // Remove code ticks
    .trim();
}