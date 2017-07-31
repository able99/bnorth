import React from 'react';
import { View,Container,NavBar } from '../../../bnorth/';

export default class MainPage extends React.Component{
  render() {
    return (
      <View>
        <Container scrollable>
          <NavBar 
            amStyle="primary" 
            title='' />
          
        </Container>
      </View>
    );
  }
}