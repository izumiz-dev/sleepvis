import { Days, Frame } from "./common-components";
import { DayUnit } from "./visualize/DayUnit";

export const DayOfWeek = () => {
  return (
    <Days>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayOfWeek) => {
        return (
          <Frame>
            <DayUnit duration={dayOfWeek} />
          </Frame>
        );
      })}
    </Days>
  );
};
