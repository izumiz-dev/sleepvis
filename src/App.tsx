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

  const rows = parseCSV(readCSV);

  return (
    <>
      <OuterContainer>
        <Title>睡眠時間</Title>
        <FileInput setInputFile={setInputFile} />
        {rows && (
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
