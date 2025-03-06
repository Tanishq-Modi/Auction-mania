import { AiOutlinePlus } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { Title, PrimaryButton, ProfileCard, DateFormatter } from "../../router";
import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { User2 } from "../../components/hero/Hero";
import { UseRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCategory, getAllCategory } from "../../redux/features/categorySlice";
import { toast } from "react-toastify";

export const CatgeoryList = () => {
    UseRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const {category}=useSelector((state)=>state.category);

    useEffect(()=>{
      dispatch(getAllCategory());
    },[dispatch]);

    const handleDeleteCategory = async (categoryId)=>{
      try{
        await dispatch(deleteCategory(categoryId));
        await dispatch(getAllCategory());
      }
      catch(error){
        toast.error("Failed to delete category");
      }
    }

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Category Lists
          </Title>
          <NavLink to="/category/create">
            <PrimaryButton className="flex items-center gap-3 px-5 py-2 text-sm rounded-md transition-transform hover:scale-105">
              <AiOutlinePlus size={20} />
              <span>Create Category</span>
            </PrimaryButton>
          </NavLink>
        </div>
        <hr className="my-5" />
        <div className="relative overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-5">
                  S.N
                </th>
                <th scope="col" className="px-20 py-5">
                  User
                </th>
                <th scope="col" className="px-6 py-5">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 flex justify-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
            {category?.map((category,index)=>(
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1 }</td>
                <td className="px-6 py-4">
                  <div className="flex items-center px-6 text-gray-900 whitespace-nowrap">
                    <div>
                      <ProfileCard>
                        <img src={category?.user.photo} alt="" />
                      </ProfileCard>
                    </div>
                    <div className="pl-3">
                      <div className="text-base font-semibold capitalize"> {category?.user.name}</div>
                      <div className="font-normal text-gray-500">{category?.user.email} </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 capitalize">{category?.title}</td>
                <td className="px-6 py-4"><DateFormatter date={category?.createdAt}/></td>

                <td className="px-6 py-4 text-center flex items-center justify-end gap-3 mt-1">
                  <NavLink to="#" type="button" className="font-medium text-indigo-500">
                    <TiEyeOutline size={25} />
                  </NavLink>
                  <NavLink to={`/category/update/${category?._id}`} className="font-medium text-green">
                    <CiEdit size={25} />
                  </NavLink>
                  <button className="font-medium text-red-500" onClick={()=> handleDeleteCategory(category?._id)}>
                    <MdOutlineDeleteOutline size={25} />
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};