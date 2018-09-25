import React from 'react';


let PropSel = aprops=>{
  let { title, option, sub, state, stateData } = aprops;
  let componnet = null;

  if(Array.isArray(option)) {
    componnet = [undefined,...option].map(v=>(
      <label key={v}>
        <span className="margin-right-xxs">{v||'none'}</span>
        <input 
          className="margin-right-"
          onChange={e=>{
            if(!sub) return state.update({[title]: v});
            let data = stateData[sub]||{};
            data[title] = v;
            state.update({[sub]: data});
          }}
          checked={sub?(stateData[sub]&&stateData[sub][title]===v):stateData[title]===v}
          type='radio' key={v} />
      </label>
    ))
  }else if(!option) {
    componnet = (
      <label>
        <input 
          className="margin-right-"
          onChange={e=>{
            if(!sub) return e.target.checked?state.update({[title]: true}):state.delete(title);
            let data = stateData[sub]||{};
            e.target.checked?(data[title]=true):(delete data[title]);
            state.update({[sub]: data});
          }}
          checked={sub?(stateData[sub]&&stateData[sub][title]):stateData[title]}
          type='checkbox' />
      </label>
    )
  }else if(typeof option==='object'&&option.type==='range') {
    let { min, max } = option;

    componnet = (
      <input 
        className="width-full"
        onChange={e=>{
          if(!sub) return state.update({[title]: e.target.value});
          let data = stateData[sub]||{};
          data[title] = e.target.value;
          state.update({[sub]: data});
        }}
        value={(sub?(stateData[sub]&&stateData[sub][title]):stateData[title])||0}
        min={min} max={max}
        type='range' />
    )
  }

  return <div className="padding-a-">{componnet}</div>;
}

export default aprops=>{
  let { title } = aprops;

  return (
    <div className="margin-bottom">
      <div className="border-set-bottom"><big><strong>{title}</strong></big></div>
      <PropSel {...aprops} />
    </div>
  ) 
}
