import styled from "styled-components";

export const OuterContainer = styled.div`
  margin-top: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`;

export const Title = styled.h1`
  /* color: #ffffff; */
`;

export const Message = styled.div`
  /* color: #ffffff; */
`;

export const Date = styled.div<{ dayOfWeek?: number }>`
  color: ${(props) => dayOfWeekColor(props.dayOfWeek || 9999)};
  font-weight: 500;
  margin-top: 2px;
  font-size: 2.25rem;
`;

export const Frame = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column;
  height: 200px;
  margin: 4px;
  border-radius: 8px;
  background: #eeeeee;
`;

export const Days = styled.div`
  width: calc(220px * 7);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const dayOfWeekColor = (dayOfWeek: number) => {
  if (dayOfWeek === 6) {
    return "#0000dd";
  }
  if (dayOfWeek === 7) {
    return "#dd0000";
  }
  return "black";
};
