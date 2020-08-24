import bootstrapJs from 'grapesjs-blocks-bootstrap4';
// import grapesCk from 'grapesjs-plugin-ckeditor';
import styleBg from 'grapesjs-style-bg';
import flexBlocks from 'grapesjs-blocks-flexbox';
import pimcorePlugin from './pimcorePlugin';

/**
 * @param {HTMLElement} node
 * @param {string} storageId
 * @param {Object} component
 * @returns {*}
 */
window.registerEditor = function (node, storageId, component) {
  let style = component.css;
  if (component.style) {
    try {
      style = JSON.parse(component.style);
    } catch (e) {
      console.err(e);
      // always fallback to css
      style = component.css;
    }
  }
  const config = {
    container: node,
    components: component.components || component.html,
    style,
    height: '600px',
    width: '95%',
    storageManager: {
      id: storageId + '-',
      type: 'local',
      autosave: true,
      autoload: false,
      stepsBeforeSave: 1,
    },
    assetManager: {
      assets: [],
      noAssets: 'No Images found in PimCore',
      upload: '/admin/pagebuilder/add-image',
      uploadName: 'grapes-upload',
      multiUpload: false,
      autoAdd: 0,
      headers: {
        ['x_pimcore_csrf_token']: pimcore.settings.csrfToken,
      },
      params: {
        csrfToken: pimcore.settings.csrfToken,
      },
      uploadText: 'Drop files here to upload them to PimCore',
      addBtnText: 'Upload',
      dropzone: 0,
      openAssetsOnDrop: 0,
      modalTitle: 'Select Image',
    },
    noticeOnUnload: 1,
    plugins: [styleBg, flexBlocks, pimcorePlugin, bootstrapJs],
    pluginsOpts: {
      [pimcorePlugin]: {
        blocks: ['pc-text-basic'],
      },
      grapesCk: {
        language: pimcore.globalmanager.get('user').language,
      }
    },
    canvas: {
      styles: [
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
      ],
      scripts: [
        'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
      ],
    },
  };
  if (!window.grapesEditor) {
    window.grapesEditor = {};
  }
  window.grapesEditor[storageId] = grapesjs.init(config);
  const assetManager = window.grapesEditor[storageId].AssetManager;
  fetch('/admin/pagebuilder/get-images').then(response => response.json()).then((result) => {
    assetManager.add(result.urls);
  });
  window.grapesEditor[storageId].on('asset:upload:start', () => {
    console.log('Started upload');
  });
  window.grapesEditor[storageId].on('asset:upload:response', (response) => {
    assetManager.add(response);
  });
  // todo: implement pimcore's ckeditor
  // window.grapesEditor[storageId].setCustomRte({
  //   enable: function (el, rte) {
  //     // If already exists just focus
  //     if (rte && rte.status !== 'destroyed') {
  //       this.focus(el, rte);
  //       return rte;
  //     }
  //
  //     let rteToolbar = window.grapesEditor[storageId].RichTextEditor.getToolbarEl();
  //     [].forEach.call(rteToolbar.children, (child) => {
  //       child.style.display = 'none';
  //     });
  //     const ck = window.CKEDITOR;
  //     let eConfig = {
  //       toolbarGroups: [
  //         {name: 'basicstyles', groups: ['undo', 'find', 'basicstyles', 'list']},
  //         '/',
  //         {name: 'paragraph', groups: ['align', 'indent']},
  //         {name: 'links'},
  //         {name: 'tools', groups: ['colors', 'tools', 'cleanup', 'mode', 'others']},
  //       ],
  //       language: pimcore.globalmanager.get('user').language,
  //       // entities: false,
  //       // entities_greek: false,
  //       // entities_latin: false,
  //       // sharedSpaces: {
  //       //   top: window.grapesEditor[storageId].RichTextEditor.getToolbarEl(),
  //       // },
  //     };
  //     ck.config.language = pimcore.globalmanager.get('user').language;
  //     if (typeof (pimcore.document.tags.wysiwyg.defaultEditorConfig) == 'object') {
  //       eConfig = mergeObject(eConfig, pimcore.document.tags.wysiwyg.defaultEditorConfig);
  //     }
  //     // CKEditor initialization
  //     rte = ck.inline(el, eConfig);
  //     rte.on('instanceReady', e => {
  //       const toolbar = rteToolbar.querySelector('#cke_' + rte.name);
  //       if (toolbar) {
  //         toolbar.style.display = 'block';
  //       }
  //       window.grapesEditor[storageId].trigger('canvasScroll');
  //     });
  //
  //     this.focus(el, rte); // implemented later
  //     return rte;
  //   },
  //   // disable(el, rte) {
  //   //   el.contentEditable = false;
  //   //   if (rte && rte.focusManager) {
  //   //     rte.focusManager.blur(true);
  //   //   }
  //   // },
  //   disable(el, rte) {
  //     console.log('hi');
  //   },
  //
  //   focus(el, rte) {
  //     // Do nothing if already focused
  //     if (rte && rte.focusManager.hasFocus) {
  //       return;
  //     }
  //     el.contentEditable = true;
  //     rte && rte.focus();
  //   },
  // });
  // window.grapesEditor[storageId].on('rteToolbarPosUpdate', (pos) => {
  //   // Update by position
  //   pos.top = pos.top - 100;
  // });
};

