"use client";

import { Button } from "flowbite-react";
import { HiOutlinePencil } from "react-icons/hi";

export function ButtonGroup() {
  return (
    <Button.Group>
      <Button color="gray">
        <HiOutlinePencil className="mr-3 h-4 w-4" />
        Input
      </Button>
    </Button.Group>
  );
}
