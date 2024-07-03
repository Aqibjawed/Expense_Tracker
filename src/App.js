import styled from 'styled-components'
import { HomeComponent } from './container/Home/HomeComponent';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: auto;
width: 350px;
background: #fff9f6;;
`;

const Header = styled.h1`
width: 100%;
text-decoration: underline;
text-align: center;
`;
function App() {
  return ( 
    <Container>
      <Header>Expense Tracker</Header>
      <HomeComponent />
    </Container>
  );
}

export default App;
