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
          随時機能追加中です．現状は，睡眠時間の表示機能のみになります．
          <br />
          下のファイルを選択ボタンからエクスポートしたCSVファイルを選択してください．
        </Message>
        <FileInput setInputFile={setInputFile} />
        <DayOfWeek />
        {calendar && <Calendar calendar={calendar} />}
      </OuterContainer>
    </>
  );
};
