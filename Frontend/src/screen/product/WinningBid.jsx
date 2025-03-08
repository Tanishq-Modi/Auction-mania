import React, { useEffect } from "react";
import { Title } from "../../router";
import { UseRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllWonedProduct } from "../../redux/features/productSlice";
import { Table } from "../../components/Table";

export const WinningBidList = () => {
  UseRedirectLoggedOutUser("/");
  const dispatch = useDispatch();
  const { wonedproducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllWonedProduct());
  }, [dispatch]);

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Winning Product Lists
          </Title>
        </div>
        <br />

        {wonedproducts && wonedproducts.length > 0 ? (
          <Table products={wonedproducts} isWon={true} />
        ) : (
          <div className="text-center py-5">
            <p className="text-gray-500">
              No products found. Start by creating a new product!
            </p>
          </div>
        )}
      </section>
    </>
  );
};
