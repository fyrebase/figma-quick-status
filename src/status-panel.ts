import { addStatus, clearNodeStatus } from './utils/status';
import { showUI } from '@create-figma-plugin/utilities'
import * as C from "./utils/constants";

figma.ui.onmessage = msg => {
  switch (msg.type) {
    case 'addStatus':
      if (msg.status === C.STATUS_CLEAR) {
        figma.currentPage.selection.forEach((node) => clearNodeStatus(node))
      } else {
        addStatus(msg.status)
      }
      break;
    default:
      break;
  }
}

export default function () {
  showUI({
    width: 180,
    height: 180
  })
}
