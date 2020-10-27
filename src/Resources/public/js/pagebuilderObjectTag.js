pimcore.registerNS('pimcore.object.tags.pagebuilder');
pimcore.object.tags.pagebuilder = Class.create(pimcore.object.tags.abstract, {
  type: 'pagebuilder',

  initialize: function (data, fieldConfig) {
    let json = {
      html: '<div class="container"></div>',
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

    this.fieldConfig = fieldConfig;
    this.editableDivId = 'object_pagebuilder_' + uniqid() + '_gjs';
  },
  //
  // getGridColumnConfig: function (field) {
  //   var renderer = function (key, value, metaData, record) {
  //     this.applyPermissionStyle(key, value, metaData, record);
  //
  //     try {
  //       if (record.data.inheritedFields && record.data.inheritedFields[key] && record.data.inheritedFields[key].inherited == true) {
  //         metaData.tdCls += ' grid_value_inherited';
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     return value;
  //
  //   }.bind(this, field.key);
  //
  //   return {
  //     text: t(field.label), sortable: true, dataIndex: field.key, renderer: renderer,
  //     getEditor: this.getWindowCellEditor.bind(this, field),
  //   };
  // },

  getGridColumnFilter: function (field) {
    return {type: 'string', dataIndex: field.key};
  },

  getLayout: function () {
    var iconCls = null;
    if (this.fieldConfig.noteditable == false) {
      iconCls = 'pimcore_icon_droptarget';
    }

    var html = '<div class="grapesjsEditor" id="' + this.editableDivId + '"></div>';
    var pConf = {
      iconCls: iconCls,
      title: this.fieldConfig.title,
      html: html,
      border: true,
      bodyStyle: 'background: #fff',
      style: 'margin-bottom: 10px',
      manageHeight: false,
      cls: 'object_field object_field_type_' + this.type,
    };

    if (this.fieldConfig.width) {
      pConf['width'] = this.fieldConfig.width;
    }

    if (this.fieldConfig.height) {
      pConf['height'] = this.fieldConfig.height;
      pConf['autoScroll'] = true;
    } else {
      pConf['autoHeight'] = true;
      pConf['autoScroll'] = true;
    }

    this.component = new Ext.Panel(pConf);
  },

  getLayoutEdit: function () {
    this.getLayout();
    this.component.on('afterlayout', this.startEditor.bind(this));
    this.component.on('beforedestroy', function () {
      if (window.grapesEditor && window.grapesEditor[this.editableDivId]) {
        window.grapesEditor[this.editableDivId] = null;
      }
    }.bind(this));
    return this.component;
  },

  startEditor: function () {
    if (window.grapesEditor && window.grapesEditor[this.editableDivId]) {
      return;
    }
    if (this.component.rendered) {
      try {
        window.registerEditor(document.getElementById(this.editableDivId), this.editableDivId, this.data);
      } catch (e) {
        console.error(e);
      }
    }
  },

  getValue: function () {
    const value = this.data;
    let stringified = JSON.stringify(value);
    if (window.grapesEditor[this.editableDivId] && window.localStorage.getItem(this.editableDivId + '-html')) {
      const newValue = JSON.stringify({
        html: window.localStorage.getItem(this.editableDivId + '-html'),
        components: window.localStorage.getItem(this.editableDivId + '-components'),
        css: window.localStorage.getItem(this.editableDivId + '-css'),
        style: window.localStorage.getItem(this.editableDivId + '-styles'),
      });
      if (newValue !== stringified) {
        stringified = newValue;
      }
    }
    return stringified;
  },

  isDirty: function () {
    if (!this.isRendered()) {
      return false;
    }

    if (this.dirty) {
      return this.dirty;
    }

    const value = this.data;
    let stringified = JSON.stringify(value);
    if (window.grapesEditor[this.editableDivId] && window.localStorage.getItem(this.editableDivId + '-html')) {
      const newValue = JSON.stringify({
        html: window.localStorage.getItem(this.editableDivId + '-html'),
        components: window.localStorage.getItem(this.editableDivId + '-components'),
        css: window.localStorage.getItem(this.editableDivId + '-css'),
        style: window.localStorage.getItem(this.editableDivId + '-styles'),
      });
      if (newValue !== stringified) {
        this.dirty = true;
        return this.dirty;
      }
    }

    return false;
  },
});
