import { toCamelCase } from './utils/string';
import { statusIcons, statusMap } from './utils/status';

export default function () {
  figma.parameters.on(
    'input',
    ({ key, query, result }: ParameterInputEvent) => {
      const statuses = [
        'Work in Progress',
        'Placeholder',
        'Ready for Review',
        'Requires Changes',
        'Approved',
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

    const key = toCamelCase(parameters.add);

    figma.currentPage.selection.forEach((node: SceneNode) => {
      node.name = statusIcons[key as keyof Object] + ' ' + node.name;
      node.setPluginData('status', statusMap[key as keyof Object].toString());
    });

    figma.closePlugin('Status applied...');
  });
}
