import {
  Drawer,
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
          <Drawer.Content
            roundedTop={placement === "bottom" ? "l3" : undefined}
            roundedBottom={placement === "top" ? "l3" : undefined}
          >
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body textAlign={"left"}>
              <Grid
                templateColumns={{
                  md: `repeat(9, 1fr)`,
                  base: `repeat(4, 1fr)`,
                }}
                gapX={"-2"}
              >
                {items.map((item, index) => (
                  <Stack key={index} p={2} onClick={() => setOpen(false)}>
                    {item}
                  </Stack>
                ))}
              </Grid>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
