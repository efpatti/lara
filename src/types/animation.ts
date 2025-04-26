import { Variant, Variants } from "framer-motion";

export interface PetalVariants extends Variants {
 initial: Variant;
 animate: Variant & {
  rotate: number[];
  transition: TransitionConfig;
 };
}

export interface StemVariants extends Variants {
 initial: Variant;
 animate: Variant & {
  rotate: number[];
  transition: TransitionConfig;
 };
}

type TransitionConfig = {
 duration: number;
 repeat: number | "infinity";
 repeatType: "loop" | "reverse" | "mirror";
 ease: string;
 delay?: number;
};

export interface LeafVariants {
 initial: Variant;
 animate: (i: number) => {
  rotate: number[];
  transition: TransitionConfig & { delay: number };
 };
}
