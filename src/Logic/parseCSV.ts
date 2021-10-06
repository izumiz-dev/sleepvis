import { DateTime, Duration } from "luxon";

export const parseCSV = (csvString: string) => {
  // 初期状態．CSVが読み込まれる前
  if (csvString === "") {
    return null;
  }
  const origin = csvString.split("\n");
  // 先頭の行を削除
  origin.shift();
  // 末尾の行を削除
  origin.pop();

  const rows: ICol[] = origin.map((line) => {
    const col = line.split(",");
    return {
      startTime: DateTime.fromFormat(col[0], "yyyy-MM-dd HH:mm:ss"),
      endTime: DateTime.fromFormat(col[1], "yyyy-MM-dd HH:mm:ss"),
      duration: Duration.fromObject(createDuration(col[2])),
      sleepTime: Duration.fromObject(createDuration(col[3])),
      wakingInBed: Duration.fromObject(createDuration(col[4])),
      timeToSleep: Duration.fromObject(createDuration(col[5])),
      goodQuality: Duration.fromObject(createDuration(col[6])),
      deepSleep: Duration.fromObject(createDuration(col[7])),
      heartRate: parseInt(col[8]),
      tag: col[9],
      annotation: col[10],
    };
  });

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

  console.table(calendar);
  return calendar;
};

const createDuration = (cols: string): { hours: number; minutes: number } => {
  // 6:10 のような時:分の形式のとき
  if (cols.split(":").length === 2) {
    return {
      hours: parseInt(cols.split(":")[0]),
      minutes: parseInt(cols.split(":")[1]),
    };
  } else if (cols === "--") {
    // "--"のとき とりあえず 0時間に設定
    return {
      hours: 0,
      minutes: 0,
    };
  } else {
    // 時間がない時 分へ
    return {
      hours: 0,
      minutes: parseInt(cols),
    };
  }
};

export interface ICol {
  startTime: DateTime; //  睡眠開始時刻
  endTime: DateTime; //  睡眠終了時刻
  duration: Duration; //  Duration
  sleepTime: Duration; //  睡眠時間
  wakingInBed: Duration; //  ベッドで起きていた時間
  timeToSleep: Duration; //  眠りにつくまでの時間
  goodQuality: Duration; //  良質な睡眠
  deepSleep: Duration; //  深い睡眠
  heartRate: number; //  心拍数
  tag: string; //  タグ
  annotation: string; //  注釈
}
