import { useEffect, useState } from "react";
import { FileInput } from "./components/FileInput";
import { ICol, parseCSV } from "./Logic/parseCSV";
import { Message, OuterContainer, Title } from "./components/common-components";
import { Calendar } from "./components/Calendar";

export const App = () => {
  const [inputFile, setInputFile] = useState<File | undefined>();
  const [readCSV, setReadCSV] = useState<string>("");
  const [calendar, setCalendar] = useState<(string | ICol)[][] | null>(null);

  useEffect(() => {
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = () => setReadCSV(reader.result as string);
      reader.readAsText(inputFile, "UTF-8");
      setCalendar(parseCSV(readCSV));
    }
    if (readCSV) {
      setCalendar(parseCSV(readCSV));
    }
  }, [inputFile, readCSV]);

  return (
    <>
      <OuterContainer>
        <Title>Sleepvis</Title>
        <Message>
          AutosleepアプリのCSVを可視化するWebアプリです．
          <br />
          日付の右隣の時刻は，上から順に，就寝時間，起床時間，心拍数となります．
          <br />
          青色は睡眠時間，緑色は良質な睡眠時間，紫色は深い睡眠時間を表しています．
          <br />
          ※推奨ディスプレイ：横幅が1920pixel以上
        </Message>
        <div style={{ display: "flex", flexFlow: "row", height: "100%" }}>
          <FileInput setInputFile={setInputFile} />
          <button onClick={() => setReadCSV(testData)}>
            デモ(テストデータ)
          </button>
        </div>
        <hr />
        <Calendar calendar={calendar} />
      </OuterContainer>
    </>
  );
};

const testData = `睡眠時刻,Until,Duration,睡眠時間,ベッドで起きていた時間, 眠りにつくまでの時間,良質な睡眠,深い睡眠,心拍数,タグ,注釈
2021-07-19 03:49:01,2021-07-19 15:04:00,11:14,10:09,1:05,0,6:43,1:29,57,--,--
2021-07-20 04:15:00,2021-07-20 11:26:00,7:34,6:04,1:30,--,3:44,1:14,65,--,--
2021-07-21 01:57:02,2021-07-21 07:57:00,5:59,4:32,1:27,1:27,3:25,1:30,55,--,--
2021-07-22 02:30:00,2021-07-22 12:01:00,9:31,8:00,1:31,--,5:49,2:30,56,--,--
2021-07-22 22:31:00,2021-07-23 07:58:00,9:27,8:11,1:16,--,6:15,1:59,56,--,--
2021-07-25 01:43:00,2021-07-25 09:31:00,7:48,7:33,15,--,5:54,2:15,56,--,--
2021-07-26 02:58:00,2021-07-26 05:32:00,2:34,2:34,0,--,1:56,46,52,--,--
2021-07-29 00:56:00,2021-07-29 07:57:00,7:01,7:01,0,--,4:37,1:30,54,--,--
2021-07-30 03:03:53,2021-07-30 05:51:00,2:47,2:40,7,7,2:12,1:04,54,--,--
2021-07-31 01:46:00,2021-07-31 10:48:00,9:51,9:51,0,--,6:58,2:45,52,--,--`;
