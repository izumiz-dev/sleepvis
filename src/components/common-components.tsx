import styled from "styled-components";

export const OuterContainer = styled.div`
  margin-top: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`;

export const Title = styled.h1`
  color: #ffffff;
`;

export const Message = styled.div`
  color: #ffffff;
`;

export const Date = styled.div`
  color: white;
  margin-top: 2px;
`;

export const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column;
  height: 100px;
  border: 1px ridge #ffffff99;
  background: linear-gradient(#08176d99, #01010799);
  margin: 2px 1px;
  border-radius: 4px;
`;

export const Days = styled.div`
  width: calc(208px * 7);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
`;
