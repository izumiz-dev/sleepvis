import { ICol } from "../Logic/parseCSV";
import { Days, Date, Frame } from "./common-components";
import { DayUnit } from "./visualize";

export const Calendar = ({ calendar }: { calendar: (string | ICol)[][] }) => {
  return (
    <Days>
      {calendar.flat().map((col: ICol | string) => {
        if (typeof col !== "string" && col.endTime !== undefined) {
          return (
            <Frame>
              <Date>{col.endTime.setLocale("jp").toFormat("MM/dd")}</Date>
              <DayUnit duration={col.sleepTime} />
            </Frame>
          );
        } else {
          return (
            <Frame>
              <Date>{`${col
                .toString()
                .substring(5, 10)
                .replace("-", "/")}`}</Date>
              <DayUnit duration={"NoData"} />
            </Frame>
          );
        }
      })}
    </Days>
  );
};
