import { useQuery, useQueryClient } from "react-query"

function getReceipts(index: number) {
  const queryClient = useQueryClient()
  const tripDates = queryClient.getQueryData<Array<any>>('trip') ?? []
  const receipts = tripDates[index]?.receipts ?? []
  return receipts
}

export function useReceipts(index: number) {
  const receipts = getReceipts(index)
  return useQuery(['receipts', index], () => receipts)
}