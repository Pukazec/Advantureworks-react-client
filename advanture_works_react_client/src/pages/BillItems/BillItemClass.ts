// classes
export class BillItem {
  billId: number;
  productId: number;
  quantity: number;
  totalPrice?: number;

  constructor(billId: number, productId: number, quantity: number) {
    this.billId = billId;
    this.productId = productId;
    this.quantity = quantity;
  }

  setTotalPrice = (selectedProduct: any) => {
    this.totalPrice = this.quantity * selectedProduct.price;
  };

  getBillItem = () => {
    return this;
  };
}
