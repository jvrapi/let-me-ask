import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { AdminRoom } from './pages/AdminRoom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { GlobalStyles } from './styles/global';
import { ChangeTheme } from './components/ChangeTheme';

function App(): JSX.Element {
  return (
    <CustomThemeProvider>
      <GlobalStyles />
      <BrowserRouter>
        <AuthContextProvider>
          <ChangeTheme />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </CustomThemeProvider>
  );
}

export default App;
