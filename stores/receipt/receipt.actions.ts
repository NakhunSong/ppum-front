import { Mode, ReceiptItemPropertyType, ReceiptPropertyType, ReceiptType } from "types/receipt.type"

export const ACTION_TYPES = {
  INIT: 'INIT',
  ADD_RECEIPT: 'ADD_RECEIPT',
  CHANGE_MODE: 'CHANGE_MODE',
  CHANGE_RECEIPT: 'CHANGE_RECEIPT',
  CHANGE_RECEIPT_ITEM: 'CHANGE_RECEIPT_ITEM',
} as const

function init(payload: ReceiptType) {
  return {
    type: ACTION_TYPES.INIT,
    payload,
  }
}

function addReceipt() {
  return {
    type: ACTION_TYPES.ADD_RECEIPT,
  }
}

function changeMode(payload: Mode) {
  return {
    type: ACTION_TYPES.CHANGE_MODE,
    payload,
  }
}

function changeReceipt(payload: ReceiptPropertyType) {
  return {
    type: ACTION_TYPES.CHANGE_RECEIPT,
    payload,
  }
}

function changeReceiptItem(payload: ReceiptItemPropertyType) {
  return {
    type: ACTION_TYPES.CHANGE_RECEIPT_ITEM,
    payload,
  }
}
 
export const actionCreators = {
  init,
  addReceipt,
  changeMode,
  changeReceipt,
  changeReceiptItem,
} as const

export type ActionTypes = 
  | ReturnType<typeof init>
  | ReturnType<typeof addReceipt>
  | ReturnType<typeof changeMode>
  | ReturnType<typeof changeReceipt>
  | ReturnType<typeof changeReceiptItem>
