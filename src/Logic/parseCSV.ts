import { DateTime } from "luxon";

export const parseCSV = (csvString: string) => {
  if (csvString === "") {
    return false;
  }
  // CSVString を オブジェクトの配列に

  const origin: any = csvString.split("\r\n");
  origin.pop();

  const rows: any = origin
    .map((line: any) => {
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

  // 開始時点の曜日を揃えるために空白(null)を追加
  if (rows[0].endTime.weekday !== 7) {
    const padNum = 7 - rows[0].endTime.weekday + 1;
    const spaces = new Array(padNum).fill(null);
    rows.unshift(...spaces);
  }

  // 記録されてないデータがある場合に，空白(null)を追加
  // バグってるというかこの処理の方法がだと対処できてない
  for (let i = 0; i < rows.length - 1; i++) {
    if (rows[i] === null) continue;
    const diff = rows[i + 1].endTime.diff(rows[i].endTime, "days");
    const diffDays = Math.floor(diff.days);
    if (diffDays >= 2) {
      for (let j = 1; j < diffDays; j++) {
        rows.splice(i + j, 0, null);
      }
    }
  }

  return rows;
};

export interface ICol {
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
