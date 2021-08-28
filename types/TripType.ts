export type TripDateType = {
  id: string,
  date: string,
  receipts: Array<any>,
}

export type TripType = {
  id: string,
  name: string,
  beginDate: string,
  endDate: string,
  prices: number,
  tripDates: TripDateType[],
}