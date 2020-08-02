import blockManager from './js/blockManager';
import styleManager from './js/styleManager';
import components from './js/components';
import panels from './js/panels';
import commands from './js/commands';

export default grapesjs.plugins.add('gjs-pimcore-plugin', (editor, options = {}) => {
  let config = options;

  components(editor, config);
  commands(editor, config);
  blockManager(editor, config);
  styleManager(editor, config);
});
