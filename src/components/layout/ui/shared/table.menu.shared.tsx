import { Button, Menu, Portal, Tabs } from "@chakra-ui/react";
import { useState, type ReactNode } from "react";

type props = {
  label: ReactNode;
  menuItems: {
    label: string,
    value: string
  }[];
};
export const MenuComponent = ({ label, menuItems }: props) => {
  const [value, setValue] = useState("asc");
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant={"plain"} size="sm" bg={"none"} _focus={{ outline: 'none'}}>
          {label}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content maxH="200px" minW="10rem">
            <Menu.RadioItemGroup
              value={value}
              onValueChange={(e) => setValue(e.value)}
            >
              {menuItems.map((item, index) => (
                <>
                  
                  <Menu.RadioItem key={item.value} value={item.value}>
                 <Tabs.Trigger
                    key={index}
                    value={item?.value}
                    bg={"none"}
                    _focus={{ outline: "none", border: "none" }}
                  >
                    {item.label}
                  </Tabs.Trigger>
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
                </>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

// const menuItems = [
//   { value: "new-file", label: "New File" },
//   { value: "new-folder", label: "New Folder" },
//   { value: "open", label: "Open..." },
//   { value: "open-recent", label: "Open Recent" },
//   { value: "save", label: "Save" },
//   { value: "save-as", label: "Save As..." },
//   { value: "save-all", label: "Save All" },
//   { value: "export", label: "Export" },
//   { value: "import", label: "Import" },
//   { value: "print", label: "Print" },
//   { value: "share", label: "Share" },
//   { value: "duplicate", label: "Duplicate" },
//   { value: "rename", label: "Rename" },
//   { value: "move", label: "Move To..." },
//   { value: "copy", label: "Copy To..." },
//   { value: "delete", label: "Delete" },
//   { value: "find", label: "Find" },
//   { value: "replace", label: "Replace" },
//   { value: "preferences", label: "Preferences" },
//   { value: "settings", label: "Settings" },
//   { value: "help", label: "Help" },
//   { value: "about", label: "About" },
//   { value: "quit", label: "Quit" },
// ];
