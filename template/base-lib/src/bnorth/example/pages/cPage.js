import React from 'react';

import { View,Container,NavBar } from '../../../bnorth/';

export default class CPage extends React.Component{
  render() {
    return (
      <View>
        <NavBar amStyle="primary" title='C'
          leftNav={[{
            title: 'back',
            component: "a",
            onClick:()=>{this.props.Apis.Navigate.back()},
          }]} />

        <Container scrollable>
          CCC
        </Container>
      </View>
    );
  }
}