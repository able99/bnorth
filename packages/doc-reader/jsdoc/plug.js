exports.defineTags = function(dictionary) {
  // component
  dictionary.defineTag('component', {
      onTagged: function(doclet, tag) {
        doclet.kind = "component";
        doclet.id = tag.value;
      }
  });

  // component attribute
  dictionary.defineTag('attribute', {
    onTagged: function(doclet, tag) {
      doclet.kind = "attribute";
      doclet.name = tag.value;
      doclet.scope = 'static';
    }
  });

  // plugin
  dictionary.defineTag('plugin', {
    onTagged: function(doclet, tag) {
      doclet.id = tag.value;
      doclet.kind = "plugin";
      doclet.scope = 'static';
      doclet.defaultvalue = '';
    }
  });

  // css class
  dictionary.defineTag('classname', {
    onTagged: function(doclet, tag) {
      doclet.name = tag.text;
      doclet.kind = "classname";
    }
  });

  // exportdefault
  dictionary.defineTag('exportdefault', {
    onTagged: function(doclet, tag) {
      doclet.exportdefault = true;
      doclet.scope = 'static';
    }
  });
  // export
  dictionary.defineTag('export', {
    onTagged: function(doclet, tag) {
      doclet.export = true;
      doclet.scope = 'static';
    }
  });
};

exports.handlers = {
  newDoclet: function(e) {
    // console.error(e.doclet);

    // classname for css class
    if(e.doclet.kind==='classname') {
      e.doclet.params && e.doclet.params.forEach(v=>{
        e.doclet.name += `-[${v.name}]`;
        e.doclet.longname += `-[${v.name}]`;
      })
    }

    // property default value
    // if(e.doclet.meta.code&&(e.doclet.meta.code.type==='ObjectExpression'||e.doclet.meta.code.type==='Literal'||e.doclet.meta.code.type==='Identifier')&&e.doclet.defaultvalue===undefined) {
    if(e.doclet.meta.code&&e.doclet.defaultvalue===undefined) {
      e.doclet.defaultvalue = e.doclet.meta.code.value||'';
    }

    // attribute 
    if(e.doclet.kind==='member'&&e.doclet.memberof&&e.doclet.memberof.endsWith('.defaultProps')) {
      e.doclet.name = e.doclet.name.replace('defaultProps.', '');
      e.doclet.longname = e.doclet.longname.replace('.defaultProps', '');
      e.doclet.memberof = e.doclet.memberof.replace('.defaultProps', '');
      e.doclet.kind = 'attribute';
    }
    if(e.doclet.kind==='member'&&e.doclet.memberof&&e.doclet.name.includes('defaultProps.')) {
      e.doclet.name = e.doclet.name.replace('defaultProps.', '');
      e.doclet.longname = e.doclet.longname.replace('.defaultProps', '');
      e.doclet.kind = 'attribute';
    }

    // static class property 
    // static props in class is not standard, so can not get default value
    // if(e.doclet.meta.code&&e.doclet.meta.code.type==='ClassProperty') {
    //   e.doclet.scope = 'static';
    // }

    // plugin mount
    let mount = e.doclet.tags&&e.doclet.tags.find(v=>v.title==='mount');
    if(mount) {
      e.doclet.name = mount.value;
    }
  }
};
