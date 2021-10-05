import { Duration } from "luxon";
import styled from "styled-components";

interface IDay {
  duration: Duration | string;
}

export const DayUnit = ({ duration }: IDay) => {
  return (
    <DayComponent duration={duration}>
      {/* Duration | string のため string でないとき Duration 型になるので， その場合は toFormat で文字列へ */}
      {typeof duration !== "string" ? duration.toFormat("hh:mm") : duration}
    </DayComponent>
  );
};

interface IDayDesign {
  duration: string;
}

const DayComponent = styled.div<IDayDesign>`
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  border-radius: 4px;
  height: ${(props) => durationHeight(props.duration)};
  width: 60px;
  margin: 4px;
  color: white;
  background: ${(props) => durationColor(props.duration)};
` as any;

const durationColor = (duration: Duration | string) => {
  const durationNum =
    typeof duration === "string" ? parseInt(duration) : duration.hours;
  if (durationNum >= 8) {
    return "#43a2e2dd";
  } else if (durationNum >= 6) {
    return "#54c454dd";
  } else if (durationNum >= 4) {
    return "#c47636dd";
  } else if (durationNum >= 2) {
    return "#DD0000dd";
  } else {
    return "#000000dd";
  }
};

const durationHeight = (duration: Duration | string) => {
  const durationNum =
    typeof duration === "string" ? parseInt(duration) : duration.hours;
  return `${durationNum * 1.5 + 20}px`;
};
