import React from "react";
import styled from "styled-components";
import { __COLORS } from "./layout/Theme";
import MyImage, { AssetType } from "./views/Figure";
import MainRouter from "./routes/MainRouter";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  margin-top: 2em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled(MyImage)`
  max-width: 100%;
  height: auto;
  width: 100px;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2em;
`;

const Authored = styled.div`
  margin: auto;
  width: 50%;
  text-align: center;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: __COLORS.PRIMARY,
    },
    secondary: {
      main: __COLORS.SECONDARY,
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        color: __COLORS.PRIMARY,
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <Logo
            source={"https://files.axelra.com/logo.png"}
            assetType={AssetType.URL}
          />
        </Header>
        <MainRouter />
      </Container>
      <Footer>
        <Authored>
          <a target="_blank" href="https://github.com/cferestrada/fqx-challenge"> <GitHubIcon /> </a>
        </Authored>
      </Footer>
    </ThemeProvider>
  );
};

export default App;
