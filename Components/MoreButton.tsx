import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as DropdownMenu from "zeego/dropdown-menu";
import { styled } from "dripsy";
import { Ionicons } from "@expo/vector-icons";
import { toast } from "sonner-native";

type MoreButtonProps = {
  pageName: string;
};
const MoreButton = ({ pageName }: MoreButtonProps) => {
  const DropdownMenuRoot = DropdownMenu.Root;
  const DropdownMenuTrigger = DropdownMenu.Trigger;
  const DropdownMenuContent = DropdownMenu.Content;
  const DropdownMenuItemTitle = DropdownMenu.ItemTitle;
  const DropdownMenuItemIcon = DropdownMenu.ItemIcon;
  const DropDownMenuGroup = DropdownMenu.Group;
  const DropdownMenuItem = DropdownMenu.create(
    styled(DropdownMenu.Item)({
      height: 34,
      width: 30,
      justifyContent: "space-around",
    }),
    "Item"
  );

  const copyToClipboard = async () => {
    const path = `myapp://(authenticated)/(tabs)/${pageName.toLowerCase()}`;
    // await Clipboard.setStringAsync(path) install expo clioboard first
    toast("Copied to Clipboard");
  };
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <TouchableOpacity>
          <Text>{pageName}</Text>
        </TouchableOpacity>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem key="fernando rojo" onSelect={copyToClipboard}>
          <DropdownMenuItemTitle>Copy</DropdownMenuItemTitle>
          <DropdownMenuItemIcon
            androidIconName={"Link"}
            ios={{ name: "link", pointSize: 24 }}
          >
            <Ionicons name="copy" size={20} />
          </DropdownMenuItemIcon>
        </DropdownMenuItem>
        <DropDownMenuGroup>
          <DropdownMenuItem key="fernando rojo" style={{ marginRight: 20 }}>
            <DropdownMenuItemTitle>Select Task </DropdownMenuItemTitle>
            <DropdownMenuItemIcon ios={{ name: "square.stack", pointSize: 24 }}>
              <Ionicons name="copy" size={20} />
            </DropdownMenuItemIcon>
          </DropdownMenuItem>
          <DropdownMenuItem key="fernando rojo" style={{ marginRight: 20 }}>
            <DropdownMenuItemTitle>Activity</DropdownMenuItemTitle>
            <DropdownMenuItemIcon
              androidIconName={"Link"}
              ios={{ name: "chart.xyaxis.line", pointSize: 24 }}
            >
              <Ionicons name="copy" size={20} />
            </DropdownMenuItemIcon>
          </DropdownMenuItem>
          <DropdownMenuItem key="fernando rojo" style={{ marginRight: 20 }}>
            <DropdownMenuItemTitle>View</DropdownMenuItemTitle>
            <DropdownMenuItemIcon
              androidIconName={"person"}
              ios={{ name: "slider.horizontal.3", pointSize: 24 }}
            >
              <Ionicons name="copy" size={20} />
            </DropdownMenuItemIcon>
          </DropdownMenuItem>
        </DropDownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};

export default MoreButton;

const styles = StyleSheet.create({});
