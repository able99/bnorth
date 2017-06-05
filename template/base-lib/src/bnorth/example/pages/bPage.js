import React from 'react';

import { View,Container,NavBar } from '../../../bnorth/';

export default class BPage extends React.Component{
  render() {
    return (
      <View>
        {!this.isSubPage()?
        <NavBar amStyle="primary" title='B'
          leftNav={[{
            title: 'back',
            component: "a",
            onClick:()=>{this.props.Apis.Navigate.back()},
          }]} />
        :null}

        <Container scrollable>
          BBB
        </Container>
      </View>
    );
  }
}