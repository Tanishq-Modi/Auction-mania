import { Caption, PrimaryButton, Title } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { UseRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createCategory, getAllCategory } from "../../redux/features/categorySlice";

export const CreateCategory = () => {
  UseRedirectLoggedOutUser("/login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title,setTitle] = useState("");
  //eslint-disable-next-line
  const [error, setError] = useState("");

  const handleInputChange= (e)=>{
    setTitle(e.target.value);
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();

    try{
      setError("");

      await dispatch(createCategory({title})).unwrap();
      await dispatch(getAllCategory().unwrap()); //get all categories
      navigate("/category");
    }
    catch(error){
      setError("Failed to create category. Please try again");
    }
  };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Create Category
        </Title>
        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <Caption className="mb-2">Title *</Caption>
            <input value={title} onChange={handleInputChange} type="text" className={`${commonClassNameOfInput}`} placeholder="Title" required />
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5">
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};