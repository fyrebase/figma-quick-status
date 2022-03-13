import { getKeyByValue } from './object';

export const statusIcons: Record<string, any> = {
  workInProgress: '⭕️',
  readyForReview: '🟡',
  requiresChanges: '🔴',
  approved: '🟢',
};

export const statusStrings: Record<string, any> = {
  workInProgress: 'Work In Progress',
  readyForReview: 'Ready for Review',
  requiresChanges: 'Requires Changes',
  approved: 'Approved',
};

export const statusMap: Record<string, any> = {
  workInProgress: 1,
  readyForReview: 2,
  requiresChanges: 3,
  approved: 4,
};

export const lookupStatus = (code: any): string => {
  return getKeyByValue(statusMap, parseInt(code));
};

export const getStatusCode = (node: SceneNode): number => parseInt(node.getPluginData('status'))

export const getCleanNodeName = (node: SceneNode) => node.name.replace(
  statusIcons[lookupStatus(node.getPluginData('status'))] + ' ',
  ''
);

export const getStatusIcon = (status: number) => statusIcons[lookupStatus(status) as keyof Object]
export const getStatusString = (status: number) => statusStrings[lookupStatus(status) as keyof Object]

export const clearNodeStatus = (node: SceneNode) => {
  node.name = getCleanNodeName(node)
  node.setPluginData('status', '');
}

export const addStatus = (status: number) => {
  figma.currentPage.selection.forEach((node: SceneNode) => {
    clearNodeStatus(node)
    node.name = statusIcons[lookupStatus(status) as keyof Object] + ' ' + node.name;
    node.setPluginData('status', status.toString());
  });
}