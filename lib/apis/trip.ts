import { backendAPI } from "lib/apis/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TripDateType, TripType } from "types/trip.type";

export function useTrips() {
  const queryClient = useQueryClient()
  const getTripsAPI = async () => {
    const response = await backendAPI.get<tripsResultType>('/trips')
    const { data: trips } = response
    return trips
  }
  const addTrip = () => useMutation(async (form: addTripPayloadType) => {
    await backendAPI.post<any>('/trips', form)
  }, {
    onSuccess: async () => {
      const data = await getTripsAPI()
      queryClient.setQueryData('trips', data)
    },
    onError: () => console.log('Trip Add Failure')
  })
  const getTrips = (setter?: React.Dispatch<string>) => useQuery('trips', getTripsAPI, {
    onSuccess: (data) => {
      setter(data?.[0]?.id)
    },
    onError: () => console.log('Trips Get Error')
  })
  const getTrip = (tripId) => useQuery('trip', async () => {
    const response = await backendAPI.get<TripType>(`/trips/${tripId}`)
    const { data: trip } = response
    return trip?.tripDates
  }, {
    onSuccess: (tripDates: TripDateType[]) => {
      const { receipts = [] } = tripDates?.[0] ?? {}
      queryClient.setQueryData(['receipts', 0], receipts)
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