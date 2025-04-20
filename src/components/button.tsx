"use client";

import { Button } from "flowbite-react";
import { HiPlusCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface ButtonGroupProps {
  path?: string; // optional
  tableName: string;
}

export function ButtonGroup({ path, tableName }: ButtonGroupProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!path) {
      console.warn("Path is undefined");
      return;
    }
    router.push(path);
  };

  return (
    <Button.Group>
      <Button color="gray" onClick={handleClick}>
        <div className="mx-auto place-content-center">
          <HiPlusCircle className="mr-3 h-4 w-4" />
        </div>
        {tableName}
      </Button>
    </Button.Group>
  );
}
