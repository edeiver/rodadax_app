export const lightTheme = {
  canvas: '#F7F8FA',
  surface: '#FFFFFF',
  border: '#E4E7EC',
  text: '#14171C',
  textSecondary: '#687080',
  accent: '#1F5BFF',
} as const;
export type ColorPalette = Record<keyof typeof lightTheme, string>;

const darkTheme: ColorPalette = {
  canvas: '#111317',
  surface: '#1A1D24',
  border: '#272C35',
  text: '#FFFFFF',
  textSecondary: '#8B93A1',
  accent: '#5B8CFF',
};

export const colors: Record<'light' | 'dark', ColorPalette> = {
  light: lightTheme,
  dark: darkTheme,
};
