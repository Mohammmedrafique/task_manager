import React from "react";
import { Sidebar } from "../Components/Sidebar";
import styled from "styled-components";
import { NoteList} from "../Components/NoteList";

export const Homepage = () => {
  return (
    <DIV>
      <NoteList/>
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  gap: 10px;
`;
