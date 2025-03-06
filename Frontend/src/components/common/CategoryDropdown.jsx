import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAllCategory } from "../../redux/features/categorySlice";
import { useEffect } from "react";
import { Loader } from "./Loader";

export const CategoryDropdown = (props) => {
    const dispatch = useDispatch();
    const {category, loading}=useSelector((state)=>state.category);
        useEffect(()=>{
          dispatch(getAllCategory());
        },[dispatch]);

    const allCategory= category?.map((category)=>{
      return{
        label: category?.title,
        value: category?._id,
      };
    });

    const handleChange= selectedOption=>{
      props.onChange(selectedOption)
    }

      
  return<>{loading? <Loader /> : <Select id="category" onChange={handleChange} options={allCategory} value={props.value} />}</>;
};