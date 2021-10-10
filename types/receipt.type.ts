export enum Mode {
  AddReceipt = 'add_receipt',
  AddReceiptItem = 'add_receipt_item',
  ModifyReceipt = 'modify_receipt',
  ModifyReceiptItem = 'modify_receipt_item',
  Plus = 'plus',
}

export type ModeType = Mode

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
  id?: string
  location: LocationType
  name: string
  prices: number
  tripDateId?: string
}

export interface ReceiptItemType {
  id?: string
  name: string
  price?: number // individual
  prices: number // group
  users?: any
}

export interface ReceiptType extends ReceiptPayloadType {
  receiptItems: ReceiptItemType[]
}

export interface ReceiptItemPayloadType extends ReceiptItemType {
  receiptId: string
}