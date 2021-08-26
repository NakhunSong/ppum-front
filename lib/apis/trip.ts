import { backendAPI } from "lib/apis/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useTrips() {
  const queryClient = useQueryClient()
  const accessToken = queryClient.getQueryData('accessToken')
  const addTrip = (callback) => useMutation(async (form: addTripPayloadType) => {
    await backendAPI.post<any>('/trips', form, {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
  }, {
    onSuccess: callback,
    onError: () => console.log('Trip Add Failure')
  })
  const getTrips = () => useQuery('trips', async () => {
    const response = await backendAPI.get<tripsResultType>('/trips', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const { data: trips } = response
    return trips
  }, {
    onError: () => console.log('GET Trips Error')
  })

  return {
    addTrip,
    getTrips,
  }
}

type addTripPayloadType = {
  name: string,
  beginDate: string,
  endDate: string,
}

type tripsResultType = {
  trips: Array<any>,
}