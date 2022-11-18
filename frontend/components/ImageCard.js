import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function ImageCard({ source, name = "temp", createdAt = null }) {
  let src = `data:image/jpg;base64,${new Buffer.from(source.data).toString(
    "base64"
  )}`;
  return (
    <motion.div className="flex flex-col overflow-hidden">
      <motion.img
        layout
        loading="lazy"
        className="w-full rounded-lg shadow-xl hover:scale-90 transition duration-500 cursor-pointer max-w-[300px]"
        src={src}
      />
      <motion.span className="p-2 flex justify-between text-gray-500">
        <motion.span>{name.substr(0, 20)}</motion.span>
        {createdAt && <motion.span>{createdAt}</motion.span>}
      </motion.span>
    </motion.div>
  );
}

export default memo(ImageCard);
