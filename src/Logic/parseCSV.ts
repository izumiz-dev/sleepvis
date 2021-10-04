import { DateTime } from "luxon";

export const parseCSV = (csvString: string) => {
  if (csvString === "") {
    return false;
  }
  // CSVString を オブジェクトの配列に

  const origin = csvString.split("\r\n");
  origin.pop();

  const rows: ICol[] = origin
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

  interface IDateMappedRow {
    [key: string]: ICol;
  }

  const dateMappedRows: IDateMappedRow = rows.reduce(
    (obj, data) => ({
      ...obj,
      [data.endTime.toFormat("yyyy-MM-dd-EEE")]: data,
    }),
    {}
  );

  const initDateTime: DateTime =
    rows[0].endTime.weekday !== 7
      ? rows[0].endTime.startOf("week").minus({ days: 1 })
      : rows[0].endTime.startOf("day");

  const endDateTime: DateTime = rows[rows.length - 1].endTime
    .endOf("week")
    .startOf("day");

  const durationDays = endDateTime.diff(initDateTime, "days").days;

  const calendar: Array<Array<ICol | string>> = [];

  let weekNum = 0;
  for (let i = 0; i < durationDays; i++) {
    const cnt = initDateTime.plus({ days: i });
    const date = cnt.toFormat("yyyy-MM-dd-EEE");
    if (weekNum === calendar.length) {
      calendar.push([]);
    }

    calendar[weekNum].push(dateMappedRows[date] ? dateMappedRows[date] : date);

    if (i % 7 === 6) {
      weekNum++;
    }
  }

  return calendar;
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
