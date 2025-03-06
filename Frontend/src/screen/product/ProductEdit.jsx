import { PrimaryButton, Caption, Title } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useNavigate, useParams } from "react-router-dom";
import { UseRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProduct, getProduct, selectProduct, updateProduct } from "../../redux/features/productSlice";

export const ProductEdit = () => {
  UseRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const productEdit = useSelector(selectProduct);
  const { isSuccess } = useSelector((state) => state.product);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (id) dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);
    setImagePreview(productEdit?.image ? productEdit.image.filePath : null);
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("lengthpic", product.lengthpic);
    formData.append("height", product.height);
    formData.append("width", product.width);
    formData.append("mediumused", product.mediumused);
    formData.append("weigth", product.weigth);
    formData.append("description", product.description);
    if (productImage) {
      formData.append("image", productImage);
    }

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getAllProduct());

    if (isSuccess) {
      navigate("/product");
    }
  };

  return (
    <section className="bg-white shadow-s1 p-8 rounded-xl">
      <Title level={5} className="font-normal mb-5">Update Product</Title>
      <hr className="my-5" />
      <form onSubmit={saveProduct}>
        <div className="w-full">
          <Caption className="mb-2">Title *</Caption>
          <input
            type="text"
            value={product?.title || ""}
            onChange={handleInputChange}
            name="title"
            className={commonClassNameOfInput}
            placeholder="Title"
            required
          />
        </div>
        <div className="flex items-center gap-5 my-4">
          <div className="w-1/2">
            <Caption className="mb-2">Height (cm)</Caption>
            <input
              type="number"
              value={product?.height || ""}
              onChange={handleInputChange}
              name="height"
              placeholder="Height"
              className={commonClassNameOfInput}
            />
          </div>
          <div className="w-1/2">
            <Caption className="mb-2">Length (cm)</Caption>
            <input
              type="number"
              value={product?.lengthpic || ""}
              onChange={handleInputChange}
              name="lengthpic"
              placeholder="Length"
              className={commonClassNameOfInput}
            />
          </div>
        </div>
        <div className="flex items-center gap-5 my-4">
          <div className="w-1/2">
            <Caption className="mb-2">Width (cm)</Caption>
            <input
              type="number"
              value={product?.width || ""}
              onChange={handleInputChange}
              name="width"
              placeholder="Width"
              className={commonClassNameOfInput}
            />
          </div>
          <div className="w-1/2">
            <Caption className="mb-2">Medium Used</Caption>
            <input
              type="text"
              value={product?.mediumused || ""}
              onChange={handleInputChange}
              name="mediumused"
              placeholder="Medium Used"
              className={commonClassNameOfInput}
            />
          </div>
        </div>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-1/2">
            <Caption className="mb-2">Weight (kg)</Caption>
            <input
              type="number"
              value={product?.weigth || ""}
              onChange={handleInputChange}
              name="weigth"
              placeholder="Weight"
              className={commonClassNameOfInput}
            />
          </div>
          <div className="w-1/2">
            <Caption className="mb-2">Price *</Caption>
            <input
              type="number"
              value={product?.price || ""}
              onChange={handleInputChange}
              name="price"
              className={commonClassNameOfInput}
              placeholder="Price"
              required
            />
          </div>
        </div>
        <div>
          <Caption className="mb-2">Description *</Caption>
          <textarea
            name="description"
            value={product?.description || ""}
            onChange={handleInputChange}
            className={commonClassNameOfInput}
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div>
          <Caption className="mb-2">Image</Caption>
          <input
            type="file"
            onChange={handleImageChange}
            className={commonClassNameOfInput}
            name="image"
          />
          {imagePreview ? (
            <div>
              <img
                src={imagePreview}
                alt="Product"
                className="md-5 rounded-lg w-48 h-48 object-cover"
              />
            </div>
          ) : (
            <p>No image set for this product.</p>
          )}
        </div>
        <PrimaryButton type="submit" className="rounded-none my-5">
          Update
        </PrimaryButton>
      </form>
    </section>
  );
};
