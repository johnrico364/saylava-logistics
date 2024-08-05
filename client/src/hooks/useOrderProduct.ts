import axios from "axios";

export const useOrderProduct = () => {
  const orderOneProduct = async (newOrder: any) => {
    try {
      const order = await axios.post("/api/order/new-order", newOrder);
      console.log(order?.data);
      return { data: order?.data, success: true };
    } catch (error: any) {
      console.log(error?.response?.data);
    }
  };

  return { orderOneProduct };
};
