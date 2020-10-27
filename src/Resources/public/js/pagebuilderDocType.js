pimcore.registerNS('pimcore.object.classes.data.pagebuilder');
pimcore.object.classes.data.pagebuilder = Class.create(pimcore.object.classes.data.data, {
  type: 'pagebuilder',
  allowIn: {
    object: true,
    objectbrick: true,
    fieldcollection: true,
    localizedfield: true,
    classificationstore: true,
    block: true,
    encryptedField: true,
  },

  initialize: function (treeNode, initData) {
    this.type = 'pagebuilder';

    this.initData(initData);

    this.availableSettingsFields = [
      'name',
      'title',
      'tooltip',
      'mandatory',
      'noteditable',
      'invisible',
      'style',
    ];

    this.treeNode = treeNode;
  },

  getTypeName: function () {
    return 'PageBuilder';
  },

  getIconClass: function () {
    return 'pimcore_icon_wysiwyg';
  },

  getLayout: function ($super) {
    $super();

    this.specificPanel.removeAll();
    var specificItems = this.getSpecificPanelItems(this.datax);
    this.specificPanel.add(specificItems);

    return this.layout;
  },

  getSpecificPanelItems: function (datax, inEncryptedField) {
    return [
      {
        xtype: 'numberfield',
        fieldLabel: t('width'),
        name: 'width',
        value: datax.width,
      },
      {
        xtype: 'numberfield',
        fieldLabel: t('height'),
        name: 'height',
        value: datax.height,
      },
    ];
  },

  applySpecialData: function (source) {
    if (source.datax) {
      if (!this.datax) {
        this.datax = {};
      }
      Ext.apply(this.datax, {
        width: source.datax.width,
        height: source.datax.height,
      });
    }
  },
});
