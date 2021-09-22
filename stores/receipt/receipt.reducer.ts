import { useReducer } from "react";
import { ReceiptType } from "types/receipt.type";
import { ActionTypes, ACTION_TYPES } from "./receipt.actions";

export const initialReceipt = {
  location: { lat: 0, lng: 0 },
  name: '',
  prices: 0,
  receiptItems: [],
  tripDateId: null,
}

export const initialReceiptItem = {
  name: '',
  price: 0,
  prices: 0,
}

function init(receiptProp) {
  return {
    mode: 'create_receipt_item',
    receipt: receiptProp,
  };
}

function reducer(state, action: ActionTypes) {
  switch (action.type) {
    case ACTION_TYPES.INIT: {
      return {
        ...state,
        receipt: action.payload,
      }
    }
    case ACTION_TYPES.ADD_RECEIPT: {
      return { ...state }
    }
    case ACTION_TYPES.CHANGE_MODE: {
      return {
        ...state,
        mode: action.payload,
      }
    }
    case ACTION_TYPES.CHANGE_RECEIPT: {
      return {
        ...state,
        receipt: {
          ...state.receipt,
          ...action.payload,
        },
      }
    }
    case ACTION_TYPES.CHANGE_RECEIPT_ITEM: {
      const { id, ...rest } = action.payload
      const receiptItems = state.receipt.receiptItems.map(r => {
        if (r.id === id) {
          return {...r, ...rest}
        }
        return r
      })
      return {
        ...state,
        receipt: {
          ...state.receipt,
          receiptItems,
        },
      }
    }
    default:
      throw new Error();
  }
}

export function useReceiptForm(receiptProp: ReceiptType) {
  return useReducer(reducer, initialReceipt, init)
}