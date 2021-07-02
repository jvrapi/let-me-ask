import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import googleIconImg from '../../assets/images/google-icon.svg';
import illustrationImg from '../../assets/images/illustration.svg';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { toast } from 'react-toastify';
import {
  Aside,
  Container,
  CreateRoom,
  Main,
  MainContent,
  Separator
} from './styles';

export const Home: React.FC = () => {
  const history = useHistory();

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
      toast.error('Room does not exists.');
      return;
    }

    if (roomRef.val().closedAt) {
      toast.warn('Room already closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <>
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
            <Logo />

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
