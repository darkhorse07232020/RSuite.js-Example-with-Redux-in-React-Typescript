import React from 'react';
import { Container, Content } from 'rsuite';
import Tables from 'components/tables';

const MainPage: React.FC = () => {
  return (
    <Container style={{ margin: '50px 100px' }}>
      <Content>
        <Tables />
      </Content>
    </Container>
  );
};

export default MainPage;
