/** @jsx h */

import {
  Container,
  render,
} from '@create-figma-plugin/ui'
import { h } from 'preact'
import { getStatusIcon, getStatusString } from './utils/status';
import style from './status-panel-ui.css';
import * as C from "./utils/constants";

function Plugin() {
  const handleStatusClick = (status: number) => {
    parent.postMessage({
      pluginMessage: {
        'type': 'addStatus',
        status
      }
    }, '*')
  }

  return (
    <Container>
      <div class={style['status-item']} onClick={() => handleStatusClick(C.STATUS_WORK_IN_PROGRESS)}>{getStatusIcon(C.STATUS_WORK_IN_PROGRESS)} {getStatusString(C.STATUS_WORK_IN_PROGRESS)}</div>
      <div class={style['status-item']} onClick={() => handleStatusClick(C.STATUS_READY_FOR_REVIEW)}>{getStatusIcon(C.STATUS_READY_FOR_REVIEW)} {getStatusString(C.STATUS_READY_FOR_REVIEW)}</div>
      <div class={style['status-item']} onClick={() => handleStatusClick(C.STATUS_REQUIRES_CHANGES)}>{getStatusIcon(C.STATUS_REQUIRES_CHANGES)} {getStatusString(C.STATUS_REQUIRES_CHANGES)}</div>
      <div class={style['status-item']} onClick={() => handleStatusClick(C.STATUS_APPROVED)}>{getStatusIcon(C.STATUS_APPROVED)} {getStatusString(C.STATUS_APPROVED)}</div>
      <div class={style['status-item']} onClick={() => handleStatusClick(C.STATUS_CLEAR)}>✨ Clear</div>
    </Container>
  )
}

export default render(Plugin)
