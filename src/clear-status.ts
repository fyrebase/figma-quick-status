import { statusIcons, lookupStatus } from './utils/status';

export default function () {
  figma.currentPage.selection.forEach((node) => {
    node.name = node.name.replace(
      statusIcons[lookupStatus(node.getPluginData('status'))] + ' ',
      ''
    );

    node.setPluginData('status', '');
  });

  figma.closePlugin('Status removed...');
}
