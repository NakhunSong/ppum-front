import { AxiosResponse } from "axios"
import { Dispatch } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { actionCreators, ActionTypes } from "stores/receipt/receipt.actions"
import { ReceiptItemPayloadType, ReceiptItemType, ReceiptPayloadType, ReceiptType } from "types/receipt.type"
import { backendAPI } from "./api"

export function useReceipts(dispatch: Dispatch<ActionTypes>) {
  const queryClient = useQueryClient()
  const getAccessToken = () => queryClient.getQueryData('accessToken')
  const addReceipt = useMutation(async (payload: ReceiptPayloadType) => {
    return await backendAPI.post('/receipts', payload, {
      headers: { Authorization: `Bearer ${getAccessToken()}`}
    })
  }, {
    onSuccess: (response: AxiosResponse) => {
      const {
        id,
        location,
        name,
        prices,
        tripDate,
      } = response.data ?? {}
      const newReceipt = {
        id,
        location,
        name,
        prices,
        receiptItems: [],
      }
      queryClient.setQueryData('trip', (prevTrip: any) => {
        return prevTrip.map(prev => {
          if (prev.id === tripDate.id) {
            prev.receipts = prev.receipts.concat(newReceipt)
            return prev
          }
          return prev
        })
      })
      queryClient.setQueryData(['receipts', 0], (prevReceipts: any) => {
        return prevReceipts.concat(newReceipt)
      })
    },
    onError: () => console.error('Receipt Add Failure')
  })
  const modifyReceipt = useMutation(async (payload: ReceiptType) => {
    return await backendAPI.patch(`/receipts/${payload.id}`, payload, {
      headers: { Authorization: `Bearer ${getAccessToken()}`}
    })
  }, {
    onSuccess: (response: AxiosResponse) => {
      const { id, location, name, tripDate } = response?.data ?? {}
      queryClient.setQueryData('trip', (prevTrip: any) => {
        return prevTrip.map(prev => {
          if (prev.id === tripDate.id) {
            prev.receipts = prev.receipts.map(p => {
              if (p.id === id) {
                return {
                  ...p,
                  location,
                  name,
                }
              }
              return p
            })
            return prev
          }
          return prev
        })
      })
      queryClient.setQueryData(['receipts', 0], (prevReceipts: any) => {
        return prevReceipts.map(prev => {
          if (prev.id === id) {
            return {
              ...prev,
              location,
              name,
            }
          }
          return prev
        })
      })
    },
    onError: () => console.error('Receipt Modify Failure')
  })
  const addReceiptItem = useMutation(async (payload: ReceiptItemPayloadType) => {
    return backendAPI.post<ReceiptItemType>(`/receipts/${payload.receiptId}/item`, {
      name: payload.name,
      prices: payload.prices,
    }, {
      headers: { Authorization: `Bearer ${getAccessToken()}`}
    })
  }, {
    onSuccess: (response: AxiosResponse) => {
      const { data } = response
      dispatch(actionCreators.addReceiptItem(data))
    },
    onError: () => console.error('Receipt Item Add Failure')
  })
  const modifyReceiptItem = useMutation(async (payload: ReceiptItemPayloadType) => {
    return await backendAPI.put<ReceiptItemType>(`/receipts/${payload.receiptId}/item/${payload.id}`, {
      name: payload.name,
      prices: payload.prices,
    }, {
      headers: { Authorization: `Bearer ${getAccessToken()}`}
    })
  }, {
    onSuccess: (response: AxiosResponse) => {
      const { data } = response
      dispatch(actionCreators.changeReceiptItem(data))
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
