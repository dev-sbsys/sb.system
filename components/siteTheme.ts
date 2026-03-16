import { Bungee, Comfortaa, Instrument_Serif, Inter, Montserrat, JetBrains_Mono, Share_Tech, Rubik_Mono_One, Sora } from "next/font/google";

export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const bungee = Bungee({
  subsets: ["latin"],
  weight: ["400"],
});

export const rubikMonoOne = Rubik_Mono_One({
  subsets: ["latin"],
  weight: ["400"],
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

export const particles = [
  { left: "8%", top: "18%", size: 3, delay: "0s", duration: "7s" },
  { left: "16%", top: "72%", size: 2, delay: "1s", duration: "9s" },
  { left: "24%", top: "32%", size: 4, delay: "2s", duration: "8s" },
  { left: "35%", top: "14%", size: 2, delay: "0.5s", duration: "10s" },
  { left: "42%", top: "66%", size: 3, delay: "1.8s", duration: "7.5s" },
  { left: "50%", top: "26%", size: 2, delay: "2.5s", duration: "9.5s" },
  { left: "58%", top: "78%", size: 4, delay: "0.8s", duration: "8.5s" },
  { left: "65%", top: "40%", size: 3, delay: "1.2s", duration: "10.5s" },
  { left: "74%", top: "20%", size: 2, delay: "2.2s", duration: "7.2s" },
  { left: "82%", top: "58%", size: 4, delay: "0.3s", duration: "8.8s" },
  { left: "90%", top: "30%", size: 3, delay: "1.5s", duration: "9.2s" },
  { left: "12%", top: "52%", size: 2, delay: "2.8s", duration: "11s" },
];
