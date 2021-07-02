import React from 'react';
import logoLight from '../../assets/images/logo.svg';
import logoDark from '../../assets/images/logo-dark.svg';
import { useTheme } from '../../hooks/useTheme';
import { useHistory } from 'react-router-dom';
import { Img } from './styles';
export const Logo: React.FC = () => {
  const { theme } = useTheme();
  const history = useHistory();

  function goToHome() {
    history.push('/');
  }

  return (
    <>
      {theme.name === 'light' ? (
        <Img
          src={logoLight}
          alt="Letmeask"
          onClick={goToHome}
          title="Letmeask"
        />
      ) : (
        <Img
          src={logoDark}
          alt="Letmeask"
          onClick={goToHome}
          title="Letmeask"
        />
      )}
    </>
  );
};
