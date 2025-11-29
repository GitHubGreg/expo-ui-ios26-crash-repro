# @expo/ui SwiftUI Button Crash on iOS 26

Minimal reproduction for a crash that occurs when using SwiftUI Button from `@expo/ui` in a React Navigation header on iOS 26.

## Bug Description

SwiftUI Button crashes with:
```
Exception Reason: -[(dynamic class) _isAncestorOfFirstResponder]: unrecognized selector sent to instance
```

The crash occurs in `RCTViewComponentView mountChildComponentView:index:` when trying to mount the SwiftUI Button as a child view.

## Environment

- Expo SDK: 54
- `@expo/ui`: 0.2.0-beta.7
- `@react-navigation/native-stack`: 7.x
- iOS: 26.1
- Device: iPhone 17,1

## Steps to Reproduce

1. Clone this repo
2. Run `npm install`
3. Run on iOS 26 device or simulator:
   ```bash
   npx expo run:ios
   ```
4. Tap "Open Modal" button
5. App crashes

## Expected Behavior

The modal should open with a SwiftUI Button (xmark icon) in the header.

## Actual Behavior

App crashes immediately when trying to render the SwiftUI Button in the navigation header.

## Crash Log

```
Exception Type:  EXC_CRASH (SIGABRT)
Exception Reason: -[(dynamic class) _isAncestorOfFirstResponder]: unrecognized selector sent to instance

Last Exception Backtrace:
0   CoreFoundation    __exceptionPreprocess
1   libobjc.A.dylib   objc_exception_throw
2   CoreFoundation    -[NSObject(NSObject) doesNotRecognizeSelector:]
...
6   React             -[RCTViewComponentView mountChildComponentView:index:]
```

## Workaround

Use standard React Native `<Pressable>` components instead of SwiftUI Button.

