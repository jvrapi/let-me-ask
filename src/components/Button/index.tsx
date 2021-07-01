import React, { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styles';
import cx from 'classnames';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  isOutlined = false,
  ...props
}) => {
  return (
    <ButtonContainer className={cx({ outlined: isOutlined })} {...props} />
  );
};
