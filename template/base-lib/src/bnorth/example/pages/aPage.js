import React from 'react';

import { View,Container,NavBar } from '../../../bnorth/';

export default class APage extends React.Component{

  render() {
    console.log(this.isSubPage());
    return (
      <View>
        {!this.isSubPage()||true?
        <NavBar amStyle="primary" title='A'
          leftNav={[{
            title: 'back',
            component: "a",
            onClick:()=>{this.props.Apis.Navigate.back()},
          }]}
          rightNav={[{
            title: 'goto C',
            component: "a",
            onClick:()=>{this.props.Apis.Navigate.push("c")},
          }]} />
        :null}

        <Container scrollable>
          AAA
        </Container>
      </View>
    );
  }
}