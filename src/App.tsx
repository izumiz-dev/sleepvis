import raw from "raw.macro";
import styled from "styled-components";
import { DayUnit } from "./components/visualize";

function App() {
  const rawCSV = raw("../AutoSleep-UTF8.csv"); //とりあえず自分のテストデータを入れる

  interface ICol {
    startTime: string; //  睡眠開始時刻
    endTime: string; //  睡眠終了時刻
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

  const rows: ICol[] = rawCSV
    .split("\n")
    .map((line) => {
      const lineCols = line.split(",");
      return {
        startTime: lineCols[0],
        endTime: lineCols[1],
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

  return (
    <Days>
      {rows.map((col: ICol) => (
        <DayUnit duration={col.duration} />
      ))}
    </Days>
  );
}

const Days = styled.div`
  width: calc(70px * 7);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
` as any;

export default App;
