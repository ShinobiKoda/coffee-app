import React, { ReactNode } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

// ============================================
// TYPES
// ============================================

type Direction = "up" | "down" | "left" | "right";

interface BaseAnimationProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
}

interface FadeProps extends BaseAnimationProps {}

interface SlideProps extends BaseAnimationProps {
  direction?: Direction;
}

interface FadeSlideProps extends BaseAnimationProps {
  direction?: Direction;
}

interface ScaleButtonProps extends Omit<PressableProps, "style"> {
  children: ReactNode;
  scaleValue?: number;
  style?: ViewStyle;
}

interface AnimatedPressableProps extends Omit<PressableProps, "style"> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleOnPress?: number;
  opacityOnPress?: number;
}

// ============================================
// FADE ANIMATIONS
// ============================================

/**
 * Fades in content on mount
 */
export const FadeInView = ({
  children,
  duration = 400,
  delay = 0,
  style,
}: FadeProps) => {
  return (
    <Animated.View
      entering={FadeIn.duration(duration).delay(delay)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Fades out content on unmount
 */
export const FadeOutView = ({
  children,
  duration = 400,
  delay = 0,
  style,
}: FadeProps) => {
  return (
    <Animated.View
      exiting={FadeOut.duration(duration).delay(delay)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Fades in on mount and fades out on unmount
 */
export const FadeView = ({
  children,
  duration = 400,
  delay = 0,
  style,
}: FadeProps) => {
  return (
    <Animated.View
      entering={FadeIn.duration(duration).delay(delay)}
      exiting={FadeOut.duration(duration)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

const slideInAnimations = {
  up: SlideInUp,
  down: SlideInDown,
  left: SlideInLeft,
  right: SlideInRight,
};

const slideOutAnimations = {
  up: SlideOutUp,
  down: SlideOutDown,
  left: SlideOutLeft,
  right: SlideOutRight,
};

/**
 * Slides in content from a direction
 */
export const SlideInView = ({
  children,
  direction = "up",
  duration = 400,
  delay = 0,
  style,
}: SlideProps) => {
  const Animation = slideInAnimations[direction];

  return (
    <Animated.View
      entering={Animation.duration(duration).delay(delay)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Slides out content in a direction
 */
export const SlideOutView = ({
  children,
  direction = "down",
  duration = 400,
  delay = 0,
  style,
}: SlideProps) => {
  const Animation = slideOutAnimations[direction];

  return (
    <Animated.View
      exiting={Animation.duration(duration).delay(delay)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Slides in on mount and slides out on unmount
 */
export const SlideView = ({
  children,
  direction = "up",
  duration = 400,
  delay = 0,
  style,
}: SlideProps) => {
  const InAnimation = slideInAnimations[direction];
  const OutAnimation = slideOutAnimations[direction];

  return (
    <Animated.View
      entering={InAnimation.duration(duration).delay(delay)}
      exiting={OutAnimation.duration(duration)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

// ============================================
// FADE + SLIDE ANIMATIONS
// ============================================

const fadeSlideInAnimations = {
  up: FadeInUp,
  down: FadeInDown,
  left: FadeInLeft,
  right: FadeInRight,
};

const fadeSlideOutAnimations = {
  up: FadeOutUp,
  down: FadeOutDown,
  left: FadeOutLeft,
  right: FadeOutRight,
};

/**
 * Fades and slides in content from a direction
 */
export const FadeSlideInView = ({
  children,
  direction = "up",
  duration = 400,
  delay = 0,
  style,
}: FadeSlideProps) => {
  const Animation = fadeSlideInAnimations[direction];

  return (
    <Animated.View
      entering={Animation.duration(duration).delay(delay)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Fades and slides out content in a direction
 */
export const FadeSlideOutView = ({
  children,
  direction = "down",
  duration = 400,
  delay = 0,
  style,
}: FadeSlideProps) => {
  const Animation = fadeSlideOutAnimations[direction];

  return (
    <Animated.View
      exiting={Animation.duration(duration).delay(delay)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Fades and slides in on mount, fades and slides out on unmount
 */
export const FadeSlideView = ({
  children,
  direction = "up",
  duration = 400,
  delay = 0,
  style,
}: FadeSlideProps) => {
  const InAnimation = fadeSlideInAnimations[direction];
  const OutAnimation = fadeSlideOutAnimations[direction];

  return (
    <Animated.View
      entering={InAnimation.duration(duration).delay(delay)}
      exiting={OutAnimation.duration(duration)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

// ============================================
// SCALE / BUTTON ANIMATIONS
// ============================================

/**
 * A button that scales down when pressed (spring animation)
 */
export const ScaleButton = ({
  children,
  scaleValue = 0.95,
  style,
  onPressIn,
  onPressOut,
  ...props
}: ScaleButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: any) => {
    scale.value = withSpring(scaleValue, {
      damping: 15,
      stiffness: 400,
    });
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 400,
    });
    onPressOut?.(e);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...props}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

/**
 * A button with both scale and opacity feedback
 */
export const AnimatedPressable = ({
  children,
  style,
  scaleOnPress = 0.97,
  opacityOnPress = 0.8,
  onPressIn,
  onPressOut,
  ...props
}: AnimatedPressableProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = (e: any) => {
    scale.value = withTiming(scaleOnPress, {
      duration: 100,
      easing: Easing.out(Easing.ease),
    });
    opacity.value = withTiming(opacityOnPress, { duration: 100 });
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 400,
    });
    opacity.value = withTiming(1, { duration: 150 });
    onPressOut?.(e);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...props}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
};

/**
 * A bounce animation for attention-grabbing elements
 */
export const BounceView = ({
  children,
  duration = 600,
  delay = 0,
  style,
}: BaseAnimationProps) => {
  return (
    <Animated.View
      entering={FadeIn.duration(duration)
        .delay(delay)
        .springify()
        .damping(12)
        .stiffness(200)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

// ============================================
// STAGGERED ANIMATIONS (for lists)
// ============================================

interface StaggeredItemProps extends BaseAnimationProps {
  index: number;
  staggerDelay?: number;
  direction?: Direction;
}

/**
 * For animating list items with staggered delay
 * Use with FlatList renderItem, passing the index
 */
export const StaggeredItem = ({
  children,
  index,
  staggerDelay = 50,
  direction = "up",
  duration = 400,
  style,
}: StaggeredItemProps) => {
  const Animation = fadeSlideInAnimations[direction];

  return (
    <Animated.View
      entering={Animation.duration(duration).delay(index * staggerDelay)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};
