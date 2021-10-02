import raw from "raw.macro";
import styled from "styled-components";
import { DayUnit } from "./components/visualize";
import { DateTime } from "luxon";

function App() {
  const rawCSV = raw("../AutoSleep-UTF8.csv"); //とりあえず自分のテストデータを入れる

  interface ICol {
    startTime: DateTime; //  睡眠開始時刻
    endTime: DateTime; //  睡眠終了時刻
    duration: string; //  Duration
    sleepTime: string; //  睡眠時間
    wakingInBed: string; //  ベッドで起きていた時間
    timeToSleep: string; //  眠りにつくまでの時間
    goodQuality: string; //  良質な睡眠
    deepSleep: string; //  深い睡眠
    heartRate: string; //  心拍数
    tag: string; //  タグ
    annotation: string; //  注釈
  }

  type rowsType = ICol | null;
  const rows: any = rawCSV
    .split("\n")
    .map((line) => {
      const lineCols = line.split(",");
      return {
        startTime: DateTime.fromFormat(lineCols[0], "yyyy-MM-dd HH:mm:ss"),
        endTime: DateTime.fromFormat(lineCols[1], "yyyy-MM-dd HH:mm:ss"),
        duration: lineCols[2],
        sleepTime: lineCols[3],
        wakingInBed: lineCols[4],
        timeToSleep: lineCols[5],
        goodQuality: lineCols[6],
        deepSleep: lineCols[7],
        heartRate: lineCols[8],
        tag: lineCols[9],
        annotation: lineCols[10],
      };
    })
    .slice(1);

  if (rows[0].endTime.weekday !== 7) {
    const padNum = 7 - rows[0].endTime.weekday + 1;
    const spaces = new Array(padNum).fill(null);
    rows.unshift(...spaces);
  }

  for (let i = 0; i < rows.length - 1; i++) {
    if (rows[i] === null) continue;
    const diff = rows[i + 1].endTime.diff(rows[i].endTime, "days");
    if (diff.days > 2) {
      rows.splice(i + 1, 0, null);
      console.log(i + 1);
      console.log(rows[i].endTime.toFormat("MM/dd"));
    }
  }

  return (
    <>
      <OuterContainer>
        <Title>睡眠時間</Title>
        <Days>
          {rows.map((col: ICol) => {
            if (col === null) {
              return (
                <Frame>
                  <Date>{""}</Date>
                  <DayUnit duration={""} />
                </Frame>
              );
            }
            if (col.endTime !== undefined) {
              return (
                <Frame>
                  <Date>{col.endTime.setLocale("jp").toFormat("M/d")}</Date>
                  <DayUnit duration={col.sleepTime} />
                </Frame>
              );
            }
            return null;
          })}
        </Days>
      </OuterContainer>
    </>
  );
}

const OuterContainer = styled.div`
  margin-top: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`;

const Title = styled.h1`
  color: #ffffff;
`;

const Date = styled.div`
  color: white;
` as any;

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: column;
  height: 80px;
  border: 1px ridge #ffffff99;
  /* border-radius: 4px; */
  background: linear-gradient(#08176d99, #01010799);
  margin: 1px;
` as any;

const Days = styled.div`
  width: calc(74px * 7);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
` as any;

export default App;
