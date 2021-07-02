import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import googleIconImg from '../../assets/images/google-icon.svg';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import {
  Aside,
  Container,
  CreateRoom,
  Main,
  MainContent,
  Separator
} from './styles';
import styled from 'styled-components';
import ReactSwitch from 'react-switch';
import { useTheme } from '../../hooks/useTheme';
const Switcher = styled(ReactSwitch)`
  position: absolute !important;
  right: 50px;
  top: 33px;
`;

export const Home: React.FC = () => {
  const history = useHistory();
  const { theme, changeTheme } = useTheme();

  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().closedAt) {
      alert('Room already closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <>
      <Switcher
        onChange={changeTheme}
        checked={theme.name === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
      />
      <Container>
        <Aside>
          <img
            src={illustrationImg}
            alt="Ilustração simbolizando perguntas e respostas"
          />
          <strong>Crie salas de Q&amp;A ao-vivo</strong>
          <p>Tira dúvidas da sua audiência em tempo-real</p>
        </Aside>
        <Main>
          <MainContent>
            <img src={logoImg} alt="letmeask" />

            <CreateRoom onClick={handleCreateRoom}>
              <img src={googleIconImg} alt="Logo da google" />
              Crie sua sala com o Google
            </CreateRoom>

            <Separator>ou entre em uma sala</Separator>

            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Digite o código da sala"
                onChange={event => setRoomCode(event.target.value)}
                value={roomCode}
              />
              <Button type="submit">Entrar na sala</Button>
            </form>
          </MainContent>
        </Main>
      </Container>
    </>
  );
};
