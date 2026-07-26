import { ComponentEntry } from "./component-registry";
import { magneticButton } from "@/components/showcase/buttons/magnetic-button";
import { buttonTextSlide } from "@/components/showcase/buttons/button-text-slide";
import { fullscreenPreloader } from "@/components/showcase/preloaders/fullscreen-preloader";
import { parallaxSection } from "@/components/showcase/parallax/parallax-section";
import { textRevealScroll } from "@/components/showcase/text-animations/text-reveal-scroll";

export const components: ComponentEntry[] = [
  magneticButton,
  fullscreenPreloader,
  parallaxSection,
  textRevealScroll,
  buttonTextSlide,
];
