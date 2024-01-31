import React from "react";
import { Flex } from "@mantine/core";
type Props = {
  children: React.ReactElement;
};

const MainLayouts: React.FC<Props> = ({ children }: Props) => {
  return (
    <Flex>
      <Flex>{children}</Flex>
    </Flex>
  );
};

export default MainLayouts;
