import { Component } from "react";
import { StyleProp, ViewStyle } from "react-native";

declare module "react-native-raw-bottom-sheet" {
  export type RBSheetProps = {
    animationType?: "none" | "fade" | "slide";
    height?: number;
    fullScreenMarginTop?: number;
    minClosingHeight?: number;
    swipeGestureMinLength: number;
    openDuration?: number;
    closeDuration?: number;
    fullScreenEnabled?: boolean;
    closeOnDragDown?: boolean;
    dragFromTopOnly?: boolean;
    closeOnPressMask?: boolean;
    closeOnPressBack?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    customStyles?: {
      wrapper?: StyleProp<ViewStyle>;
      container?: StyleProp<ViewStyle>;
      draggableIcon?: StyleProp<ViewStyle>;
    };
    keyboardAvoidingViewEnabled?: boolean;
  };

  export default class RBSheet extends Component<RBSheetProps> {
    open(): void;
    close(): void;
    fullScreen(): void;
    minimize(): void;
  }
}
