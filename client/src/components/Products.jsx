import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(true);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5555/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    const shuffledList = shuffle(updatedList);
    setFilter(shuffledList);
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className=" d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>Shop All</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothes")}>Men's Clothes</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothes")}>Women Clothes</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("teen's clothes")}>Teen Clothes</button>
          <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("kids clothes")}>Kids Clothes</button>
        </div>
        <style>
          {`.hover:hover {
            transform: scale(1.05); /* Scale the card slightly on hover */
            transition: transform 0.2s ease-in-out;
          }`}
        </style>
        {filter.map((product) => {
          return (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card h-100 text-center p-4 hover"> 
                <img src={product.image_url} className="card-img-top " alt={product.name} height="250px" />
                <div className="card-body">
                  <h5 className="card-name mb-0">{product.name.substring(0, 12)}...</h5>
                  <p className="card-text lead fw-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  <Link to={`/products/${product.id}`} className="btn btn-outline-dark">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-name mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
