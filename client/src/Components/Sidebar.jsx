import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styled from "styled-components";

export const Sidebar = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const initialCategory = searchParam.getAll("category");
  const initialOrder = searchParam.get("order");
  const [category, setCategory] = useState(initialCategory || []);
  const [order, setOrder] = useState(initialOrder || "");

  useEffect(() => {
    let params = {
      category,
    };
    order && (params.order = order);
    setSearchParams(params);
  },[category, order]);


  const handleCategory = (e) => {
    const {value} = e.target;
    // console.log(value);
    let newCategory = [...category];
    if(newCategory.includes(value)){
      newCategory = newCategory.filter((el) => el !== value);
    }else{
      newCategory.push(value);
    }
    setCategory(newCategory);
  };

  const handleOrder = (e) => {
   const {value} = e.target;
    setOrder(value);
  }

  return (
    <DIV>
      <h3>Filter by Category</h3>
      <div>
        <input data-testid="novel-filter" type="checkbox" value={"Novel"} onChange={handleCategory} checked={category.includes("Novel")}/>
        <label>Novel</label>
        <br />
        <input
          data-testid="science-fiction-filter"
          type="checkbox"
          value={"Science_Fiction"}
          onChange={handleCategory}
          checked={category.includes("Science_Fiction")}
        />
        <label>Science Fiction</label>
        <br />
        <input
          data-testid="thriller-filter"
          type="checkbox"
          value={"Thriller"}
          onChange={handleCategory}
          checked={category.includes("Thriller")}
        />
        <label>Thriller</label>
        <br />
        <input
          data-testid="motivational-filter"
          type="checkbox"
          value={"Motivational"}
          onChange={handleCategory}
          checked={category.includes("Motivational")}
        />
        <label>Motivational</label>
        <br />
      </div>
      <br />
      <br />
      <h3>Sort By Release Year</h3>
      <div onChange={handleOrder}>
        <input data-testid="sort-asc" type="radio" name="sort" value={"asc"} defaultChecked={order === "asc"}/>
        <label>Ascending</label>
        <br />
        <input
          data-testid="sort-desc"
          type="radio"
          name="sort"
          value={"desc"}
          defaultChecked = {order === "desc"}
        />
        <label>Descending</label>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  width: 15%;
  border-right: 1px solid gray;
`;
