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
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled(MyImage)`
  max-width: 100%;
  height: auto;
  width: 100px;
`;

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
