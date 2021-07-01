import React from 'react';
import copyImg from '../../assets/images/copy.svg';
import { Button } from './styles';
type RoomCodeProps = {
  code: string;
};

export const RoomCode: React.FC<RoomCodeProps> = (props: RoomCodeProps) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <Button onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </Button>
  );
};
