import React from 'react';

import { MixinPage,View,Container,NavBar } from '../bnorth/';

export default React.createClass({
  mixins: [MixinPage],

  render() {
    return (
      <View {...this.getPageProps()}>
        <NavBar 
          amStyle="primary" 
          title='home'
          rightNav={[{
            title: 'login',
            component: "a",
            onClick:()=>{this.props.Apis.Navigate.push("/login")},
          }]} />

        <Container scrollable>
 
        </Container>
      </View>
    )
  },
});
