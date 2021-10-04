import _ from "lodash";
import { useReducer } from "react"
import { Mode } from "types/receipt.type";
import { ActionTypes, ACTION_TYPES } from "./receipt.actions"

export const initialReceipt = ()=> {
  return {
    location: { lat: 0, lng: 0 },
    name: '',
    prices: 0,
    receiptItems: [],
    tripDateId: null,
  }
}

export const initialReceiptItem = {
  name: '',
  price: 0,
  prices: 0,
}

function init(receiptProp) {
  return {
    mode: Mode.Plus,
    receipt: receiptProp,
    tempReceipt: receiptProp,
  };
}



function reducer(state, action: ActionTypes) {
  switch (action.type) {
    case ACTION_TYPES.INIT: {
      const temp = _.cloneDeep(action.payload)
      return {
        ...state,
        receipt: action.payload,
        tempReceipt: temp,
      }
    }
    case ACTION_TYPES.ADD_RECEIPT: {
      return {
        ...state,
        receipt: {
          ...initialReceipt(),
          location: action.payload,
        }
      }
    }
    case ACTION_TYPES.ADD_RECEIPT_ITEM: {
      return {
        ...state,
        receipt: {
          ...state.receipt,
          receiptItems: [
            action.payload,
            ...state.receipt.receiptItems,
          ],
        }
      }
    }
    case ACTION_TYPES.CANCEL_EDIT: {
      const temp = _.cloneDeep(state.tempReceipt)
      return {
        ...state,
        receipt: temp,
      }
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
          return { id, ...rest}
        }
        return r
      })
      return {
        ...state,
        receipt: {
          ...state.receipt,
          receiptItems,
        }
      }
    }
    default:
      throw new Error();
  }
}

export function useReceiptForm() {
  return useReducer(reducer, initialReceipt(), init)
}