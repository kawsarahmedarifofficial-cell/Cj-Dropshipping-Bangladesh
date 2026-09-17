export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  product: string;
  qty: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Credit' | 'Debit';
  status: 'Completed' | 'Pending';
}
