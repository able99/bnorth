export function getDocName(doc) {
  if(!doc) return '';
  return (doc.kind==='module'&&doc.memberof?(trimDocName(doc.memberof)+'.'):'')+trimDocName(doc.name);
}

export function trimDocName(name) {
  return name && name.replace(/module:/i,'').replace(/^exports\./i,'');
}

export function trimModuleName(name) {
  return name && name.replace(/.*module.\w*\.?~?/,'');
}