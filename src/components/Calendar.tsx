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
                <DateHeader>
                  <Date>{col.endTime.setLocale("jp").toFormat("MM.dd")}</Date>
                  <TimesBox>
                    <div>🛌{col.startTime.toFormat("HH:mm")}</div>
                    <div>🛏{col.endTime.toFormat("HH:mm")}</div>
                    <div>❤️{col.heartRate}</div>
                  </TimesBox>
                </DateHeader>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                >
                  <Unit>
                    <DayUnit duration={col.sleepTime} sleepType="sleepTime" />
                  </Unit>
                  <Unit>
                    <DayUnit
                      duration={col.goodQuality}
                      sleepType="goodQuality"
                    />
                  </Unit>
                  <Unit>
                    <DayUnit duration={col.deepSleep} sleepType="deepSleep" />
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
                .replace("-", ".")}`}</Date>
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
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  align-items: center;
`;

const DateHeader = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const TimesBox = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 1rem;
`;
