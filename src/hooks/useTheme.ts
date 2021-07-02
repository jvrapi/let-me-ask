import { useContext } from 'react';
import {
  CustomThemeContext,
  CustomThemeThemeType
} from '../contexts/ThemeContext';

export function useTheme(): CustomThemeThemeType {
  const value = useContext(CustomThemeContext);
  return value;
}
