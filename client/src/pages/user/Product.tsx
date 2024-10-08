import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "../../components/ProductCard";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllProducts } from "../../hooks/product/useGetAllProducts";

export const Product = () => {
  const navigate = useNavigate();
  const [allProducts, set_allProducts] = useState<any>([]);

  const { getAllProducts } = useGetAllProducts();

  const productData = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const products = await getAllProducts();
      set_allProducts(products);
    },
  });

  return (
    <div className="product-container">
      <div className="search-nav">
        <input className="search-bar" type="text" placeholder="Search" />
      </div>
      <div className="flex justify-center mt-3">
        <img
          className="banner"
          src={require("../../images/assets/milk-banner.jpg")}
          alt="banner"
        />
      </div>
      {productData.isLoading && <div className="text-6xl">Loading...</div>}

      <div className="items-container">
        {allProducts?.map((product: any) => {
          return (
            <div
              onClick={() =>
                navigate(`/user/product/${product?.name}-${product?._id}`)
              }
            >
              <ProductCard data={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
