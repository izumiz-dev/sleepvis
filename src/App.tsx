import styled from "styled-components";
import { DayUnit } from "./components/visualize";
import { useEffect, useState } from "react";
import { FileInput } from "./components/FileInput";
import { ICol, parseCSV } from "./Logic/parseCSV";

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
        <Days>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (dayOfWeek) => {
              return (
                <Frame>
                  <DayUnit duration={dayOfWeek} />
                </Frame>
              );
            }
          )}
        </Days>
        {calendar && (
          <Days>
            {calendar.flat().map((col: ICol | string) => {
              console.log(col);
              if (typeof col !== "string" && col.endTime !== undefined) {
                return (
                  <Frame>
                    <Date>{col.endTime.setLocale("jp").toFormat("MM/dd")}</Date>
                    <DayUnit duration={col.sleepTime} />
                  </Frame>
                );
              } else {
                return (
                  <Frame>
                    <Date>{`${col
                      .toString()
                      .substring(5, 10)
                      .replace("-", "/")}`}</Date>
                    <DayUnit duration={"NoData"} />
                  </Frame>
                );
              }
            })}
          </Days>
        )}
      </OuterContainer>
    </>
  );
};

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

const Message = styled.div`
  color: #ffffff;
`;

const Date = styled.div`
  color: white;
  margin-top: 2px;
`;

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
`;

const Days = styled.div`
  width: calc(74px * 7);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
`;
