import {
  Drawer,
  Flex,
  Grid,
  Portal,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { type ReactNode } from "react";

type props = {
  placement: "bottom" | "top" | "start" | "end";
  children: ReactNode;
  items: any[];
  title: string;
};

export const DrawerComponent = ({
  children,
  placement,
  items,
  title,
}: props) => {
  const { onToggle, setOpen } = useDisclosure();
  return (
    <Drawer.Root
      placement={placement}
      size={"sm"}
      onOpenChange={() => setOpen(false)}
    >
      <Drawer.Trigger onClick={onToggle} asChild>
        {children}
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body textAlign={"left"}>
              <Flex
              >
                {items.map((item, index) => (
                  <Stack key={index} onClick={() => setOpen(false)}>
                    {item}
                  </Stack>
                ))}
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
