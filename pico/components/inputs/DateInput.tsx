import { IoMdInformationCircleOutline } from "react-icons/io";
import { InputLabel } from "../container/InputLabel";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type DateInputProps = {
    setDueDate:Dispatch<SetStateAction<Date>>;
    setDateDiff:Dispatch<SetStateAction<number>>;
    setErrorNo:Dispatch<SetStateAction<number>>;
    dueDate: Date;
    dateDiff: number;
  };

const DateInput = ({ setDueDate, setDateDiff, setErrorNo, dueDate, dateDiff }: DateInputProps): ReactNode => 
{
const [infoOpen, setInfoOpen] = useState<boolean>(false);
const dueMsg = `${
Math.round(dateDiff / (24 * 60))
    ? Math.round(dateDiff / (24 * 60)) + "일"
    : ""
} 
    ${
    Math.round(dateDiff / 60)
        ? (Math.round(dateDiff / 60) % 24) + "시간"
        : ""
    }
    ${Math.round(dateDiff % 60)}분 후 만료`;


  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;

    // Extract hour and minute components from the current dueDate
    const currentHour = dueDate.getHours();
    const currentMinute = dueDate.getMinutes();
    // Create a new Date object with the selected date and the preserved time
    const newDate = new Date(dateString);
    newDate.setHours(currentHour);
    newDate.setMinutes(currentMinute);

    //calculate Time difference
    const now = new Date();
    const diff = (newDate.getTime() - now.getTime()) / (60 * 1000); //minute 단위
    console.log(diff);
    setDueDate(newDate);
    setDateDiff(Math.floor(diff));
    if (diff <= 0) {
      setErrorNo(5);
      return;
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = event.target.value;
    const [newHour, newMinute] = timeString.split(":");

    let currentDate = dueDate || new Date();
    currentDate.setHours(+newHour);
    currentDate.setMinutes(+newMinute);
    // Calculate Time difference in hours (with timezone offset)
    const now = new Date();
    const diff = (currentDate.getTime() - now.getTime()) / (60 * 1000);
    console.log(diff);

    if (diff < 0) {
      setErrorNo(5);
      return;
    }

    setDueDate(currentDate);
    setDateDiff(Math.floor(diff));
  };  


  return (
    <>
    <InputLabel>만료 기한</InputLabel>
      <div className="flex flex-col lg:w-full">
        <div className="w-full h-fit flex items-center">
          <input className="text-black h-10 w-42 m-2 p-4 border-2"
            type="date"
            onChange={handleDateChange}/>
          <input className="text-black h-10 w-42 m-2 p-4 border-2"
            type="time"
            step={60}
            onChange={handleTimeChange}/>
          <IoMdInformationCircleOutline
            className="w-6 h-6"
            onMouseOver={() => setInfoOpen(true)}
            onMouseOut={() => setInfoOpen(false)}/>
          {infoOpen && (
            <p className="absolute translate-y-[130%] right-4 bg-pico_darker p-2 rounded-lg">
              앨범 기본 마감기한은 7일입니다.
            </p>
          )}
        </div>
        <p className="h-12 text-center p-2  justify-center">
          {dateDiff > 0 && dueMsg}
        </p>
      </div>
    </>
  );
};

export default DateInput;