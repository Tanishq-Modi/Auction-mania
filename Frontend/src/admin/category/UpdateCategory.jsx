
import { PrimaryButton } from "../../router";
import { Caption, commonClassNameOfInput, Title } from "../../components/common/Design";
import { UseRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllCategory, updateCategory } from "../../redux/features/categorySlice";

export const UpdateCategory = () => {
    UseRedirectLoggedOutUser("/login");
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [title,setTitle] = useState("");
    const {isSuccess} = useSelector((state)=>state.category);
  
    const handleSubmit= async (e)=>{
      e.preventDefault();
      const formData={
        title: title,
      };
      await dispatch(updateCategory({formData, id}));
      await dispatch(getAllCategory()); //get all categories
      if(isSuccess){
        navigate("/category");
      }
    };
  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Update Category
        </Title>

        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <Caption className="mb-2">Title *</Caption>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)} name="title" className={`${commonClassNameOfInput}`} />
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5">
            Update
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};
