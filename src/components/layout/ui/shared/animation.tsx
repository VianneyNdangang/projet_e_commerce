import { Box } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect, type ReactNode } from "react";

type props = {
  children: ReactNode;
  duration?: number;
  w?: string;
  h?: string;
};

const MotionBox = motion.create(Box);

export const ScrollAnimationBox = React.memo(
  ({ children, duration, w, h}: props) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true, // déclenche à 20% de visibilité
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <MotionBox
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: duration ? duration : 0.6 },
          },
        }}
        justifyContent={"center"}
        textAlign={"center"}
        w={w}
        h={h}
      >
        {children}
      </MotionBox>
    );
  }
);
