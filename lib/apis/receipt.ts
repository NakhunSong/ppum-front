import { useMutation, useQuery, useQueryClient } from "react-query"
import { LocationType } from "types/LocationType"
import { backendAPI } from "./api"


export function useReceipts() {
  const queryClient = useQueryClient()
  const addReceipt = useMutation(async (form: addReceiptType) => {
    const accessToken = queryClient.getQueryData('accessToken')
    await backendAPI.post('/receipts', form, {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
  }, {
    onError: () => console.log('Receipt Add Failure')
  })
  const getReceipts = (index: number) => useQuery(['receipts', index], () => {
    const tripDates = queryClient.getQueryData<Array<any>>('trip') ?? []
    return tripDates[index]?.receipts ?? []
  })
  return {
    addReceipt,
    getReceipts,
  }
}

type addReceiptType = {
  location: LocationType,
  name: string,
  prices: number,
  tripDateId: string,
}