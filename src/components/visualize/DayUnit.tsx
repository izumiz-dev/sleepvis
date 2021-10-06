import { Duration } from "luxon";
import styled from "styled-components";

interface IDay {
  duration: Duration | string;
  sleepType?: string;
}

export const DayUnit = ({ duration, sleepType }: IDay) => {
  return (
    <DayComponent duration={duration} sleepType={sleepType}>
      {/* Duration | string のため string でないとき Duration 型になるので， その場合は toFormat で文字列へ */}
      {typeof duration !== "string" ? duration.toFormat("hh:mm") : duration}
    </DayComponent>
  );
};

interface IDayDesign {
  duration: string;
  sleepType?: string;
}

const DayComponent = styled.div<IDayDesign>`
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  border-radius: 8px;
  height: ${(props) => durationHeight(props.duration)};
  width: 60px;
  margin: 4px;
  /* color: white; */
  background: ${(props) => durationColor(props.duration, props.sleepType)};
` as any;

const durationColor = (duration: Duration | string, sleepType?: string) => {
  const durationNum =
    typeof duration === "string" ? parseInt(duration) : duration.hours;
  let color = "#0099ff";
  if (sleepType === "goodQuality") {
    color = "#15ff00";
  }
  if (sleepType === "deepSleep") {
    color = "#7700ff";
  }
  if (durationNum >= 8) {
    return color + "FF";
  } else if (durationNum >= 6) {
    return color + "DD";
  } else if (durationNum >= 4) {
    return color + "BB";
  } else if (durationNum >= 2) {
    return color + "99";
  } else if (durationNum >= 0) {
    return color + "55";
  } else {
    return "#5e5e5edd";
  }
};

const durationHeight = (duration: Duration | string) => {
  const durationNum =
    typeof duration === "string" ? parseInt(duration) : duration.hours;
  return `${durationNum * 10 + 20}px`;
};
