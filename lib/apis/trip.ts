import { backendAPI } from "lib/apis/api";
import { useQuery, useQueryClient } from "react-query";

export function useTrips() {
  const queryClient = useQueryClient()
  return useQuery('trips', async () => {
    const accessToken = queryClient.getQueryData('accessToken')
    const response = await backendAPI.get<tripsResultType>('/trips', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const { data: trips } = response
    return trips
  }, {
    onError: () => console.log('GET Trips Error')
  })
}

type tripsResultType = {
  trips: Array<any>,
}