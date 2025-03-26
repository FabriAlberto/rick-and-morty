"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
type Props={
  paramName: string;
}

const ButtonResetCharacters: FC<Props> = ({paramName}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const character= searchParams.get(paramName) || null;

  if (!character) return null;
  const onClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete(paramName);
    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <button
      className="btn btn-error p-2 cursor-pointer rounded-md border-1 border-red-500 text-red-500"
      onClick={onClick}
    >
      <p className="text-sm">Remove selection ❌</p>
    </button>
  );
};

export default ButtonResetCharacters;
