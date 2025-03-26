"use client";
import React, { FC, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { Avatar } from "antd";
import useIsMobile from "@/hooks/useIsMobile";

type Props = {
  image: ReactNode;
  title: string;
  content?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const CustomCard: FC<Props> = ({
  image,
  title,
  className,
  content,
  disabled,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  return (
    <motion.article
      className={`relative  ${className} rounded-lg ${
        disabled && "opacity-25"
      }`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {image}
      <motion.div
        animate={
          isMobile
            ? undefined
            : isHovered && !disabled
            ? { height: "100%", borderRadius: "10px" }
            : { height: "50px" }
        }
        transition={{ duration: 0.3, delay: 0.4 }}
        className=" pl-3 mt-4  sm:absolute group rounded-b-lg overflow-hidden z-10 bottom-0  border-zinc-500 h-[150px] sm:h-[50px] bg-black/40 backdrop-blur-sm   w-full"
      >
        <div className="flex items-center">
          <motion.div
            transition={{ delay: 0.5 }}
            animate={
              (isHovered && !disabled) || isMobile
                ? {
                    width: 40,
                    opacity: 1,
                    position: "relative",
                    marginRight: 8,
                    marginTop: 8,
                  }
                : { width: 0, opacity: 0, position: "absolute", marginRight: 0 }
            }
          >
            <Avatar size={40} src={image} />
          </motion.div>
          <p className="text-white font-bold"> {title}</p>
        </div>

        <motion.div
          animate={
            (isHovered && !disabled) || isMobile
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{ delay: 0.5 }}
        >
          {content}
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

export default CustomCard;
