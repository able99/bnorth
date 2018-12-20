import React from 'react';
import ReactMarkdown from 'react-markdown';
import Panel from '@bnorth/components/lib/Panel';
import List from '@bnorth/components/lib/List';
import Type from './Type';


export default aprops=>{
  let {app, title, data=[], showDefault, ...props} = aprops;

  return data.length?(
    <List header={title} headerProps={{'b-size': 'lg', 'className': 'text-weight-bold'}} {...props} separatorInset={false}>
      <List.Item bc-padding-a-0>
        <Panel component="table" b-size="sm" bc-width-full>
          <thead>
            <tr>
              <th className="padding-a-sm text-align-left">Name</th>
              <th className="padding-a-sm text-align-left">Type</th>
              <th className="padding-a-sm text-align-left">Description</th>
              {showDefault?<th className="padding-a-sm text-align-left">default</th>:null}
            </tr>
          </thead>
          <tbody>
            {data.map((v,i)=>(
              <Panel component="tr" key={i} bc-bg-color-component={i%2===0}>
                <td className="padding-a-sm">{v.name}</td>
                <td className="padding-a-sm"><Type app={app} data={v.type} /></td>
                <td className="padding-a-sm">{v.desc}</td>
                {showDefault?<td className="padding-a-sm"><ReactMarkdown source={v.default} /></td>:null}
              </Panel>
            ))}
          </tbody>
        </Panel>
      </List.Item>
    </List>
  ):null;
}
