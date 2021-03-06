# react-native-raw-bottom-sheet

[![npm version](https://badge.fury.io/js/react-native-raw-bottom-sheet.svg)](//npmjs.com/package/react-native-raw-bottom-sheet)
[![npm downloads](https://img.shields.io/npm/dm/react-native-raw-bottom-sheet.svg)
](//npmjs.com/package/react-native-raw-bottom-sheet)
[![Build Status](https://travis-ci.org/nysamnang/react-native-raw-bottom-sheet.svg?branch=master)](https://travis-ci.org/nysamnang/react-native-raw-bottom-sheet)

- Super Lightweight Component
- Add Your own Component To Bottom Sheet
- Customize Whatever You Like
- Support Drag Down Gesture
- Support All Orientations
- Support iOS
- Smooth Animation
- Zero Configuration
- Zero dependency
- Top Search Ranking (react native bottom sheet) at [npms.io](https://npms.io/search?q=react%20native%20bottom%20sheet)

## Example

#### Class component

```jsx
import React, { Component } from "react";
import { View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

export default class Example extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.open()} />
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <YourOwnComponent />
        </RBSheet>
      </View>
    );
  }
}
```

#### Functional component

```jsx
import React, { useRef } from "react";
import { View, Button } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

export default function Example() {
  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <YourOwnComponent />
      </RBSheet>
    </View>
  );
}
```

#### Dynamic Bottom Sheet

```jsx
renderItem = (item, index) => (
  <View>
    <Button title={`OPEN BOTTOM SHEET-${index}`} onPress={() => this[RBSheet + index].open()} />
    <RBSheet
      ref={ref => {
        this[RBSheet + index] = ref;
      }}
    >
      <YourOwnComponent onPress={() => this[RBSheet + index].close()} />
    </RBSheet>
  </View>
);
```

## Props

| Props            | Type     | Description                                             | Default  |
| ---------------- | -------- | ------------------------------------------------------- | -------- |
| animationType    | string   | Background animation ("none", "fade", "slide")          | "none"   |
| height           | number   | Height of Bottom Sheet                                  | 260      |
| fullScreenMarginTop | number   | Set the margin from the top for full screen mode.    | 0        |
| minClosingHeight | number   | Minimum height of Bottom Sheet before close             | 0        |
| swipeGestureMinLength | number   | Length user needs to swipe before it's registered as swipe up or down action | 150        |
| openDuration     | number   | Open Bottom Sheet animation duration                    | 300 (ms) |
| closeDuration    | number   | Close Bottom Sheet animation duration                   | 200 (ms) |
| fullScreenEnabled  | boolean  | Enable full screen mode on swipe up                   | false    |
| enableGestures   | boolean  | Enable gestures                                         | false    |
| dragFromTopOnly  | boolean  | Drag only the top area of the draggableIcon to close Bottom Sheet instead of the whole content | false    |
| closeOnPressMask | boolean  | Press the area outside to close Bottom Sheet            | true     |
| closeOnPressBack | boolean  | Press back android to close Bottom Sheet (Android only) | true     |
| onClose          | function | Callback function when Bottom Sheet has closed          | null     |
| onOpen           | function | Callback function when Bottom Sheet has opened          | null     |
| customStyles     | object   | Custom style to Bottom Sheet                            | {}       |
| keyboardAvoidingViewEnabled     | boolean   | Enable KeyboardAvoidingView             | true (ios) |

### Available Custom Style

```
customStyles: {
  wrapper: {...}, // The Root of Component (You can change the `backgroundColor` or any styles)
  container: {...}, // The Container of Bottom Sheet
  draggableIcon: {...} // The Draggable Icon (If you set closeOnDragDown to true)
}
```

## Methods

| Method Name | Description        |
| ----------- | ------------------ |
| open        | Open Bottom Sheet  |
| close       | Close Bottom Sheet |
| fullScreen  | Switch to fullscreen view  |
| minimize    | Switch to default view |


## License

Pending [MIT]

## Author

Made with ❤️ by [NY Samnang](https://github.com/nysamnang) and added full screen functionality with ❤️ by [DC](https://github.com/dcheema6)
