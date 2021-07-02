import React, { useContext } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Switcher, IconContainer } from './styles';
import { FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

export const ChangeTheme: React.FC = () => {
  const { theme, changeTheme } = useTheme();
  const { colors } = useContext(ThemeContext);

  return (
    <Switcher
      onChange={changeTheme}
      checked={theme.name === 'dark'}
      offColor={colors.disabled}
      onColor={colors.ballSwitch}
      checkedIcon={
        <IconContainer>
          <FiSun size={15} />
        </IconContainer>
      }
      uncheckedIcon={
        <IconContainer>
          <FiMoon size={15} color={colors.text} />
        </IconContainer>
      }
    />
  );
};
