import { LocationType } from './LocationType';
import { ReceiptItemType } from './ReceiptItemType';

export type Receipt = {
  id?: string;
  name: string;
  location: LocationType;
  prices: number;
  receiptItems?: ReceiptItemType[];
}