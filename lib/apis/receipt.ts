import { useMutation, useQuery, useQueryClient } from "react-query"
import { ReceiptPayloadType, ReceiptType } from "types/receipt.type"
import { backendAPI } from "./api"

export function useReceipts() {
  const queryClient = useQueryClient()
  const addReceipt = useMutation(async (payload: ReceiptPayloadType) => {
    const accessToken = queryClient.getQueryData('accessToken')
    await backendAPI.post('/receipts', payload, {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
  }, {
    onError: () => console.error('Receipt Add Failure')
  })
  const modifyReceipt = useMutation(async (payload: ReceiptType) => {
    const accessToken = queryClient.getQueryData('accessToken')
    await backendAPI.patch<any>(`/receipts/${payload.id}`, payload, {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
  }, {
    onError: () => console.error('Receipt Modify Failure')
  })
  const getReceipts = (index: number) => useQuery(['receipts', index], () => {
    const tripDates = queryClient.getQueryData<Array<any>>('trip') ?? []
    return tripDates[index]?.receipts ?? []
  })
  return {
    addReceipt,
    modifyReceipt,
    getReceipts,
  }
}
