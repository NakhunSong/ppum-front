import { Dispatch } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { actionCreators, ActionTypes } from "stores/receipt/receipt.actions"
import { ReceiptItemPayloadType, ReceiptItemType, ReceiptPayloadType, ReceiptType } from "types/receipt.type"
import { backendAPI } from "./api"

export function useReceipts(dispatch: Dispatch<ActionTypes>) {
  const queryClient = useQueryClient()
  const addReceipt = useMutation(async (payload: ReceiptPayloadType) => {
    return await backendAPI.post('/receipts', payload)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('trip')
    },
    onError: () => console.error('Receipt Add Failure')
  })
  const modifyReceipt = useMutation(async (payload: ReceiptType) => {
    return await backendAPI.patch(`/receipts/${payload.id}`, payload)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('trip')
    },
    onError: () => console.error('Receipt Modify Failure')
  })
  const addReceiptItem = useMutation(async (payload: ReceiptItemPayloadType) => {
    return backendAPI.post<ReceiptItemType>(`/receipts/${payload.receiptId}/item`, {
      name: payload.name,
      prices: payload.prices,
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('trip')
    },
    onError: () => console.error('Receipt Item Add Failure')
  })
  const modifyReceiptItem = useMutation(async (payload: ReceiptItemPayloadType) => {
    return await backendAPI.put<ReceiptItemType>(`/receipts/${payload.receiptId}/item/${payload.id}`, {
      name: payload.name,
      prices: payload.prices,
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('trip')
    },
    onError: () => console.error('Receipt Item Modify Failure')
  })
  const getReceipts = (index: number) => useQuery(['receipts', index], () => {
    const tripDates = queryClient.getQueryData<Array<any>>('trip') ?? []
    return tripDates[index]?.receipts ?? []
  })
  return {
    addReceipt,
    addReceiptItem,
    modifyReceipt,
    modifyReceiptItem,
    getReceipts,
  }
}
