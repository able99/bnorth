import React from 'react';
import Notification from 'bnorth-components/lib/Notification'
import Mask from 'bnorth-components/lib/Mask'
import Button from 'bnorth-components/lib/Button'
import AnimationFade from 'bnorth-components/lib/AnimationFade'

export default props=>{
  let { app } = props;
  return (
    <div>
      <Button onClick={()=>{
        //app.router.addView(<div>1</div>);
        //app.notice.show('1', {Transition:"div"})
        //app.notice.show('1')
        app.modal.show('1')
        //app.mask.show({Transition:"div"})
      }}>notice</Button>
    </div>
  );
};