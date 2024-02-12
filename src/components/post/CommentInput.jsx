import React from "react";
import { Icon } from "@iconify/react";

function CommentInput() {
  return (
    <div name="post" className="relative mx-2">
      <input
        className="w-full h-[40px] rounded-[10px] border-0 py-5 pl-7 pr-20 text-[16px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1.5 focus:ring-inset focus:ring-[#0D0B5F] text-sm font-light "
        placeholder="Your Message ..."
      ></input>
      <button className="py-[6px] px-[12px] rounded-[10px] flex-shrink-0 bg-gradient-to-br from-[#0D0B5F] to-[#029BE0] hover:from-[#029BE0] hover:to-[#0D0B5F] rounded-[10px] absolute top-1/2 right-[-6px] transform -translate-x-1/2 -translate-y-1/2 text-[16px]">
        <Icon icon="wpf:sent" color="#fff" className="py-0.1" />
      </button>
    </div>
  );
}

export default CommentInput;
