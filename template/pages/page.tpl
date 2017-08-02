import React from 'react';
import { View,Container,NavBar } from '{{ levels }}bnorth/';

export default class {{ name }}Page extends React.Component{
  render() {
    return (
      <View>
        <NavBar 
          amStyle="primary" 
          leftNav={[NavBar.navItemBack]}
          title='{{ name }}' />
        <Container scrollable>
        </Container>
      </View>
    )
  }
}