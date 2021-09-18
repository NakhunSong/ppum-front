import { useMutation, useQuery, useQueryClient } from "react-query"
import { addReceiptType, ReceiptType } from "types/ReceiptType"
import { backendAPI } from "./api"

export function useReceipts() {
  const queryClient = useQueryClient()
  const addReceipt = useMutation(async (form: addReceiptType) => {
    const accessToken = queryClient.getQueryData('accessToken')
    await backendAPI.post('/receipts', form, {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
  }, {
    onError: () => console.error('Receipt Add Failure')
  })
  const modifyReceipt = useMutation(async (form: ReceiptType) => {
    const accessToken = queryClient.getQueryData('accessToken')
    await backendAPI.patch<any>(`/receipts/${form.id}`, form, {
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
