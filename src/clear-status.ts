import { formatSuccessMessage } from '@create-figma-plugin/utilities';
import { clearNodeStatus } from './utils/status';

export default function () {
  figma.currentPage.selection.forEach((node) => clearNodeStatus(node))

  figma.closePlugin(formatSuccessMessage('Status cleared...'));
}
