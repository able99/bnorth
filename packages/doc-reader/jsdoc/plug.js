exports.defineTags = function(dictionary) {
  // component
  dictionary.defineTag('component', {
      onTagged: function(doclet, tag) {
        doclet.kind = "component";
      }
  });

  // css class
  dictionary.defineTag('cssclass', {
    onTagged: function(doclet, tag) {
      doclet.name = tag.text;
      doclet.kind = "cssclass";
    }
  });
};

exports.handlers = {
  newDoclet: function(e) {
    // console.error(e.doclet);

    // css class
    if(e.doclet.kind==='cssclass') {
      e.doclet.params && e.doclet.params.forEach(v=>{
        e.doclet.name += `-[${v.name}]`;
      })
    }

    // property default value
    if(e.doclet.meta.code&&e.doclet.meta.code.type==='ObjectExpression'&&e.doclet.defaultvalue===undefined) {
      e.doclet.defaultvalue = e.doclet.meta.code.value;
    }

    // attribute 
    if(e.doclet.kind==='member'&&e.doclet.memberof.endsWith('.defaultProps')) {
      e.doclet.longname = e.doclet.longname.replace('.defaultProps', '');
      e.doclet.memberof = e.doclet.memberof.replace('.defaultProps', '');
      e.doclet.kind = 'attribute';
    }

    // static class property 
    // static props in class is not standard, so can not get default value
    // if(e.doclet.meta.code&&e.doclet.meta.code.type==='ClassProperty') {
    //   e.doclet.scope = 'static';
    // }
  }
};
