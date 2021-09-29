import styled from "styled-components";

interface IDay {
  duration: string;
}

export const DayUnit = ({ duration }: IDay) => {
  return <DayComponent duration={duration}>{duration}</DayComponent>;
};

interface IDayDesign {
  duration: string;
}

const DayComponent = styled.div<IDayDesign>`
  display: flex;
  -webkit-align-items: center; /* 縦方向中央揃え（Safari用） */
  align-items: center; /* 縦方向中央揃え */
  -webkit-justify-content: center; /* 横方向中央揃え（Safari用） */
  justify-content: center; /* 横方向中央揃え */
  border-radius: 2px;
  height: ${(props) => durationHeight(props.duration)};
  width: 60px;
  margin: 4px;
  color: white;
  background: ${(props) => durationColor(props.duration)};
` as any;

const durationColor = (duration: string) => {
  const durationNum = parseInt(duration, 10);
  if (durationNum >= 6) {
    return "#54c454dd";
  } else if (durationNum >= 4) {
    return "#c47636dd";
  } else if (durationNum >= 2) {
    return "#DD0000dd";
  } else {
    return "#FFFFFF";
  }
};

const durationHeight = (duration: string) => {
  const durationNum = parseInt(duration, 10);
  const height = `${durationNum * 1.2 + 20}px`;
  console.log(height);
  return height;
};
