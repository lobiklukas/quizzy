import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useState } from "react";

interface ISwipableCard {
  children: React.ReactNode;
  onResult: (vote: boolean) => void;
  onDragChange?: (vote: boolean | null) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

type DragStart = {
  axis: null | "x" | "y";
  animation: { x: number; y: number };
};

export const SwipableCard = ({
  children,
  onResult,
  onDragStart,
  onDragChange,
  onDragEnd,
}: ISwipableCard) => {
  const [dragStart, setDragStart] = useState<DragStart>({
    axis: null,
    animation: { x: 0, y: 0 },
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(
    x,
    [-window.innerWidth, window.innerWidth],
    [-90, 90]
  );

  const onDirectionLock = (axis: DragStart["axis"]) =>
    setDragStart({ ...dragStart, axis: axis });

  const animateCardSwipe = (
    animation: DragStart["animation"],
    direction: "right" | "left"
  ) => {
    setDragStart({ ...dragStart, animation });
    onResult(direction === "right" ? true : false);
  };

  const getExitDirection = () => {
    const exitWidth = window.innerWidth * 0.25;
    if (dragStart.axis === "x") {
      if (dragStart.animation.x > 0) return exitWidth;
      else if (dragStart.animation.x < 0) return -exitWidth;
    }
    return 0;
  };

  return (
    <motion.div
      drag="x"
      style={{
        x,
        rotate,
        y,
      }}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragDirectionLock
      onDirectionLock={onDirectionLock}
      onDragStart={() => {
        if (onDragStart) onDragStart();
      }}
      onDragEnd={(e, info) => {
        if (dragStart.axis === "x") {
          if (info.offset.x >= 200) animateCardSwipe({ x: 175, y: 0 }, "right");
          else if (info.offset.x <= -200)
            animateCardSwipe({ x: -175, y: 0 }, "left");
        }
        if (onDragEnd) setTimeout(() => onDragEnd(), 100);
      }}
      onDrag={(e, info) => {
        if (dragStart.axis === "x" && onDragChange) {
          if (info.offset.x >= 200) onDragChange(true);
          else if (info.offset.x <= -200) onDragChange(false);
          else {
            onDragChange(null);
          }
        }
      }}
      initial={{ opacity: 0 }}
      animate={{ ...dragStart.animation, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 50 }}
      whileTap={{ scale: 0.85 }}
      exit={{ opacity: 0, x: getExitDirection(),transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
};
