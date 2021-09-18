import { LocationType } from './LocationType';
import { ReceiptItemType } from './ReceiptItemType';

export type ReceiptType = {
  id?: string
  name: string
  location: LocationType
  prices: number
  receiptItems?: ReceiptItemType[]
}

export type addReceiptType = {
  location: LocationType
  name: string
  prices: number
  tripDateId: string
}
