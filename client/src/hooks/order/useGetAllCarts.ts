import axios from "axios";

export const useGetAllCarts = () => {
  const getAllCarts = async (ordered_by: string) => {
    try {
      const carts = await axios.get(`/api/order/cart/${ordered_by}`);
      console.log(carts);
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllCarts };
};
