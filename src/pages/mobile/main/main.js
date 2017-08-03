import React from 'react';
import { View,Container,NavBar } from '../../../bnorth/';

export default class MainPage extends React.Component{
  render() {
    return (
      <View>
        <NavBar 
          amStyle="primary" 
          title='Home' />

        <Container scrollable>

        </Container>
      </View>
    );
  }
}