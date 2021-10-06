import { useEffect, useState } from "react";
import { FileInput } from "./components/FileInput";
import { parseCSV } from "./Logic/parseCSV";
import { Message, OuterContainer, Title } from "./components/common-components";
import { DayOfWeek } from "./components/DayOfWeek";
import { Calendar } from "./components/Calendar";

export const App = () => {
  const [inputFile, setInputFile] = useState<File | undefined>();
  const [readCSV, setReadCSV] = useState<string>("");

  useEffect(() => {
    if (inputFile) {
      const reader = new FileReader();
      reader.onload = () => setReadCSV(reader.result as string);
      reader.readAsText(inputFile, "UTF-8");
    }
  }, [inputFile]);

  const calendar = parseCSV(readCSV);

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
          下のファイルを選択ボタンからエクスポートしたCSVファイルを選択してください．
        </Message>
        <FileInput setInputFile={setInputFile} />
        {/* <DayOfWeek /> */}
        {calendar && <Calendar calendar={calendar} />}
      </OuterContainer>
    </>
  );
};
