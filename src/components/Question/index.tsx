import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { Container, Footer, UserInfo } from './styles';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighlighted?: boolean;
  isAnswered?: boolean;
};

export const Question: React.FC<QuestionProps> = ({
  content,
  author,
  children,
  isHighlighted = false,
  isAnswered = false
}) => {
  const style = classNames(
    'question',
    { answered: isAnswered },
    { highlighted: isHighlighted && !isAnswered }
  );

  return (
    <Container className={style}>
      <p>{content}</p>
      <Footer>
        <UserInfo>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </UserInfo>
        <div>{children}</div>
      </Footer>
    </Container>
  );
};
