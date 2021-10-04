import { LocationType, ModeType, ReceiptItemType, ReceiptPropertyType, ReceiptType } from "types/receipt.type"

export const ACTION_TYPES = {
  INIT: 'INIT',
  ADD_RECEIPT: 'ADD_RECEIPT',
  ADD_RECEIPT_ITEM: 'ADD_RECEIPT_ITEM',
  CANCEL_EDIT: 'CANCEL_EDIT',
  CHANGE_MODE: 'CHANGE_MODE',
  CHANGE_RECEIPT: 'CHANGE_RECEIPT',
  CHANGE_RECEIPT_ITEM: 'CHANGE_RECEIPT_ITEM',
  CREATE_RECEIPT: 'CREATE_RECEIPT',
  CREATE_RECEIPT_ITEM: 'CREATE_RECEIPT_ITEM',
} as const

function init(payload: ReceiptType) {
  return {
    type: ACTION_TYPES.INIT,
    payload,
  }
}

function addReceipt(payload: LocationType) {
  return {
    type: ACTION_TYPES.ADD_RECEIPT,
    payload,
  }
}

function addReceiptItem(payload: ReceiptItemType) {
  return {
    type: ACTION_TYPES.ADD_RECEIPT_ITEM,
    payload,
  }
}

function cancelEdit() {
  return {
    type: ACTION_TYPES.CANCEL_EDIT,
  }
}

function changeMode(payload: ModeType) {
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

function changeReceiptItem(payload: ReceiptItemType) {
  return {
    type: ACTION_TYPES.CHANGE_RECEIPT_ITEM,
    payload,
  }
}

function createReceipt(payload) {
  return {
    type: ACTION_TYPES.CREATE_RECEIPT,
    payload,
  }
}

function createReceiptItem(payload) {
  return {
    type: ACTION_TYPES.CREATE_RECEIPT_ITEM,
    payload,
  }
}
 
export const actionCreators = {
  init,
  addReceipt,
  addReceiptItem,
  cancelEdit,
  changeMode,
  changeReceipt,
  changeReceiptItem,
  createReceipt,
  createReceiptItem,
} as const

export type ActionTypes = 
  | ReturnType<typeof init>
  | ReturnType<typeof addReceipt>
  | ReturnType<typeof addReceiptItem>
  | ReturnType<typeof cancelEdit>
  | ReturnType<typeof changeMode>
  | ReturnType<typeof changeReceipt>
  | ReturnType<typeof changeReceiptItem>
  | ReturnType<typeof createReceipt>
  | ReturnType<typeof createReceiptItem>
