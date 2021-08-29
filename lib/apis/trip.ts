import { backendAPI } from "lib/apis/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TripDateType, TripType } from "types/TripType";

export function useTrips() {
  const queryClient = useQueryClient()
  const addTrip = (callback) => useMutation(async (form: addTripPayloadType) => {
    const accessToken = queryClient.getQueryData('accessToken')
    await backendAPI.post<any>('/trips', form, {
      headers: { Authorization: `Bearer ${accessToken}`}
    })
  }, {
    onSuccess: callback,
    onError: () => console.log('Trip Add Failure')
  })
  const getTrips = (setter: React.Dispatch<string>) => useQuery('trips', async () => {
    const accessToken = queryClient.getQueryData('accessToken')
    const response = await backendAPI.get<tripsResultType>('/trips', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const { data: trips } = response
    return trips
  }, {
    onSuccess: (data) => {
      setter(data?.[0].id)
    },
    onError: () => console.log('Trips Get Error')
  })
  const getTrip = (tripId) => useQuery('trip', async () => {
    const accessToken = queryClient.getQueryData('accessToken')
    const response = await backendAPI.get<TripType>(`/trips/${tripId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const { data: trip } = response
    return trip?.tripDates
  }, {
    onSuccess: (tripDates: TripDateType[]) => {
      const { receipts = [] } = tripDates?.[0] ?? {}
      queryClient.setQueryData(['receipts', 0], receipts)
      console.log('on Success receipts: ', receipts)
    },
    onError: () => console.log('Trip Get Error')
  })

  return {
    addTrip,
    getTrips,
    getTrip,
  }
}

type addTripPayloadType = {
  name: string,
  beginDate: string,
  endDate: string,
}

type tripsResultType = {
  trips: TripType[],
}