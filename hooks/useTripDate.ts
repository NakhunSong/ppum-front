import { useQuery, useQueryClient } from "react-query"

function getReceipts(index: number) {
  const queryClient = useQueryClient()
  const tripDates = queryClient.getQueryData<Array<any>>('tripDates') ?? []
  const receipts = tripDates[index]?.receipts ?? []
  return receipts
}

export function useTripDate(index: number) {
  const receipts = getReceipts(index)
  return useQuery(['receipts', index], () => receipts)
}