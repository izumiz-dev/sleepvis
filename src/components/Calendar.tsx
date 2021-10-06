import { DateTime } from "luxon";
import styled from "styled-components";
import { ICol } from "../Logic/parseCSV";
import { Days, Date, Frame } from "./common-components";
import { DayUnit } from "./visualize/DayUnit";

export const Calendar = ({
  calendar,
}: {
  calendar: (string | ICol)[][] | null;
}) => {
  if (calendar) {
    return (
      <Days>
        {calendar &&
          calendar.flat().map((col: ICol | string) => {
            if (typeof col !== "string" && col.endTime !== undefined) {
              return (
                <>
                  <Frame>
                    <DateHeader>
                      <Date dayOfWeek={col.endTime.weekday}>
                        {col.endTime.setLocale("jp").toFormat("MM.dd")}
                      </Date>
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
                        <DayUnit
                          duration={col.sleepTime}
                          sleepType="sleepTime"
                        />
                      </Unit>
                      <Unit>
                        <DayUnit
                          duration={col.goodQuality}
                          sleepType="goodQuality"
                        />
                      </Unit>
                      <Unit>
                        <DayUnit
                          duration={col.deepSleep}
                          sleepType="deepSleep"
                        />
                      </Unit>
                    </div>
                  </Frame>
                </>
              );
            } else {
              return (
                <Frame>
                  <Date
                    dayOfWeek={
                      DateTime.fromFormat(col.toString(), "yyyy-MM-dd-EEE")
                        .weekday
                    }
                  >{`${col
                    .toString()
                    .substring(5, 10)
                    .replace("-", ".")}`}</Date>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        width: "204px",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        color: "rgba(0,0,0,0.5)",
                      }}
                    >
                      データがありません
                    </div>
                  </div>
                </Frame>
              );
            }
          })}
      </Days>
    );
  }
  return null;
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
