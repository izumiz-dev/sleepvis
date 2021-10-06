import styled from "styled-components";
import { ICol } from "../Logic/parseCSV";
import { Days, Date, Frame } from "./common-components";
import { DayUnit } from "./visualize/DayUnit";

export const Calendar = ({ calendar }: { calendar: (string | ICol)[][] }) => {
  return (
    <Days>
      {calendar.flat().map((col: ICol | string) => {
        if (typeof col !== "string" && col.endTime !== undefined) {
          return (
            <>
              <Frame>
                <Date>{col.endTime.setLocale("jp").toFormat("MM/dd")}</Date>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                >
                  <Unit>
                    <div style={{ color: "white" }}>Total</div>
                    <DayUnit duration={col.sleepTime} />
                  </Unit>
                  <Unit>
                    <div style={{ color: "white" }}>Good</div>
                    <DayUnit duration={col.goodQuality} />
                  </Unit>
                  <Unit>
                    <div style={{ color: "white" }}>Deep</div>
                    <DayUnit duration={col.deepSleep} />
                  </Unit>
                </div>
              </Frame>
            </>
          );
        } else {
          return (
            <Frame>
              <Date>{`${col
                .toString()
                .substring(5, 10)
                .replace("-", "/")}`}</Date>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <DayUnit duration={""} />
                <DayUnit duration={""} />
                <DayUnit duration={""} />
              </div>
            </Frame>
          );
        }
      })}
    </Days>
  );
};

const Unit = styled.div`
  height: 70px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
`;
