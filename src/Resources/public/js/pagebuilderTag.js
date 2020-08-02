pimcore.registerNS("pimcore.document.tags.pagebuilder");
pimcore.document.tags.pagebuilder = Class.create(pimcore.document.tag, {
  getType: function () {
    return "pagebuilder";
  },

  initialize: function (id, name, options, data, inherited) {
    console.log('initializing grapesjs editor ...');
    // setup all variables
    this.id = id;
    this.name = name;
    this.setupWrapper();
    this.options = options = this.parseOptions(options);
    this.inherited = inherited;
    let json = {
      html: '<h1>cbenco PageBuilder</h1>',
      components: null,
      css: null,
      style: null,
    };
    if (data) {
      json = JSON.parse(data);
      if (json.components) {
        json.components = JSON.parse(json.components);
      }
    }
    this.data = json;
    this.element = Ext.get(id);

    // create grapes-editor
    const editorId = id + '_gjs';
    this.editorId = editorId;
    this.grapesEditor = document.createElement('div');
    this.grapesEditor.id = editorId;
    this.element.appendChild(this.grapesEditor).addCls('grapesjsEditor')
    this.startEditor(editorId);

    if (options['required']) {
      this.required = options['required'];
    }
  },

  getValue: function () {
    const value = this.data;
    let stringified = JSON.stringify(value);
    if (window.grapesEditor[this.editorId] && window.localStorage.getItem(this.editorId + '-html')) {
      const newValue = JSON.stringify({
        html: window.localStorage.getItem(this.editorId + '-html'),
        components: window.localStorage.getItem(this.editorId + '-components'),
        css: window.localStorage.getItem(this.editorId + '-css'),
        style: window.localStorage.getItem(this.editorId + '-styles'),
      });
      if (newValue !== stringified) {
        stringified = newValue;
      }
    }
    return stringified;
  },

  startEditor: function (editorId) {
    try {
      window.registerEditor(document.getElementById(editorId), editorId, this.data);
    } catch (e) {
      console.error(e);
    }
  },
});
