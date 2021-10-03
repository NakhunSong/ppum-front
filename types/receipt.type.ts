export type AddMode = 'add_receipt' | 'add_receipt_item'

export type ModifyMode = 'modify_receipt' | 'modify_receipt_item'

export type Mode = AddMode | ModifyMode

export type PriceProperty = 'price' | 'prices'

export type ReceiptPropertyKey =
  'name' | PriceProperty | 'location'

export type LocationType = {
  lat: number
  lng: number
}

export type ReceiptPropertyType = {
  [propertyKey: string]: any
}

export type ReceiptItemPropertyType = {
  id: string
} & ReceiptPropertyType

export interface ReceiptPayloadType {
  location: LocationType
  name: string
  prices: number
  tripDateId: string
}

export interface ReceiptItemType {
  id?: string
  name: string
  price?: number // individual
  prices: number // group
  users?: any
}

export interface ReceiptType extends ReceiptPayloadType {
  id?: string
  receiptItems: ReceiptItemType[]
}

export interface ReceiptItemPayloadType extends ReceiptItemType {
  receiptId: string
}