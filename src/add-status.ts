import { addStatus, getStatusIcon, getStatusString, statusMap } from './utils/status';
import { formatSuccessMessage } from '@create-figma-plugin/utilities';
import { toCamelCase } from './utils/string';
import * as C from "./utils/constants";

export default function () {
  figma.parameters.on(
    'input',
    ({ key, query, result }: ParameterInputEvent) => {
      const statuses = [
        `${getStatusIcon(C.STATUS_WORK_IN_PROGRESS)} ${getStatusString(C.STATUS_WORK_IN_PROGRESS)}`,
        `${getStatusIcon(C.STATUS_READY_FOR_REVIEW)} ${getStatusString(C.STATUS_READY_FOR_REVIEW)}`,
        `${getStatusIcon(C.STATUS_REQUIRES_CHANGES)} ${getStatusString(C.STATUS_REQUIRES_CHANGES)}`,
        `${getStatusIcon(C.STATUS_APPROVED)} ${getStatusString(C.STATUS_APPROVED)}`,
      ];

      result.setSuggestions(
        statuses.filter((s) => s.toLocaleLowerCase().includes(query))
      );
    }
  );

  figma.on('run', ({ command, parameters }: RunEvent) => {
    if (!command || !parameters) {
      return;
    }

    addStatus(statusMap[toCamelCase(parameters.add.substring(3))])

    figma.closePlugin(formatSuccessMessage('Status applied...'));
  });
}
