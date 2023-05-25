import React from "react";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../../components/Card/ProductCard";

const RelatedProducts = ({ categoryId, productId }) => {
  const { data, loading } = useFetch(
    `http://localhost:1337/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
  );

  return (
    <div>
      <h2 style={{ fontWeight: "400", marginTop: "50px" }}>Similar Products</h2>

      <div
        className="related-products"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          marginTop: "30px",
        }}
      >
        {loading
          ? "loading"
          : data?.map((item) => (
              <ProductCard item={item} id={item.id} key={item.id} />
            ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
