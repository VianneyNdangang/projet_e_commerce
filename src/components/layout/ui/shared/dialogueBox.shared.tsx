import {
  Dialog,
  Portal,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

type props = {
  open: boolean;
  close: ()=> void;
  body: ReactNode;
  size: any;
  p?: any
};

export const DialogBox = ({ open, close, size, body, p}: props) => {
  return (
    <Dialog.Root open={open} size={size} placement={"center"} onOpenChange={() => close()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body p={p}>
              {body}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
