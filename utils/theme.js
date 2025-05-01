// Define theme colors
export const colors = {
  primary: {
    main: "#9BEC00", // KIWI
    light: "#BDFF53",
    dark: "#77B300",
    contrast: "#121212",
  },
  background: {
    dark: "#121212",
    card: "#1E1E1E",
    elevated: "#2A2A2A",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#B3B3B3",
    tertiary: "#757575",
    accent: "#9BEC00", // KIWI
  },
  status: {
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    info: "#2196F3",
  },
  achievement: {
    bronze: "#CD7F32",
    silver: "#C0C0C0",
    gold: "#FFD700",
    platinum: "#E5E4E2",
  },
  exerciseTypes: {
    push: "#FF5722",
    pull: "#2196F3",
    legs: "#9C27B0",
    cardio: "#FF9800",
  },
  gradients: {
    dark: ["#121212", "#1A1A1A"],
    card: ["#1E1E1E", "#252525"],
  },
};

// Spacing system (based on 8px)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
export const typography = {
  fontFamily: {
    regular: "Montserrat-Regular",
    medium: "Montserrat-Medium",
    bold: "Montserrat-Bold",
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
};

// Rounded corners
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 50,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

// Button styles
export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary.main,
    textColor: colors.primary.contrast,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  secondary: {
    backgroundColor: colors.background.elevated,
    textColor: colors.text.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  outline: {
    backgroundColor: "transparent",
    textColor: colors.primary.main,
    borderRadius: borderRadius.md,
    borderColor: colors.primary.main,
    borderWidth: 1,
    padding: spacing.md,
  },
};

// Card styles
export const cardStyles = {
  default: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
  },
  elevated: {
    backgroundColor: colors.background.elevated,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
};

const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  buttonStyles,
  cardStyles,
};

export default theme;
