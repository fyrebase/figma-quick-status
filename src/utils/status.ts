import { getKeyByValue } from './object';

export const statusIcons: Record<string, any> = {
  workInProgress: '🟡',
  placeholder: '⚫️',
  readyForReview: '🟣',
  requiresChanges: '🔴',
  approved: '🟢',
};

export const statusMap: Record<string, any> = {
  workInProgress: 1,
  placeholder: 2,
  readyForReview: 3,
  requiresChanges: 4,
  approved: 5,
};

export const lookupStatus = (codeStr: string): string => {
  let codeNum: Number = parseInt(codeStr);

  return getKeyByValue(statusMap, codeNum);
};
