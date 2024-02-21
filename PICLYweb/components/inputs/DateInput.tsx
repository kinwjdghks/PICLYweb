import { InputLabel } from "../container/InputLabel";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { Error } from "../modal/ErrorModal";
import { formatDateStringforTag, getDateDiffByMinute } from "@/lib/functions/dateFunctions";

type DateInputProps = {
  setDueDate: Dispatch<SetStateAction<Date>>;
  setDateDiff: Dispatch<SetStateAction<number>>;
  setErrorNo: Dispatch<SetStateAction<Error>>;
  dueDate: Date;
  dateDiff: number;
};

const DateInput = ({ setDueDate,setDateDiff,setErrorNo,dueDate,dateDiff }: DateInputProps): ReactNode => {
  
  //useRef
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  //useEffect
  useEffect(()=>{
    if(dateInputRef.current && timeInputRef.current){
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    const formattedDate = currentDate.toISOString().split('T')[0];
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    // Set the value of the date input field to one week from today
    dateInputRef.current.value = formattedDate;

    // Set the value of the time input field to the current time next week
    timeInputRef.current.value = formattedTime;
    }
  },[])
  
  const dueMsg = `${
    Math.round(dateDiff / (24 * 60))
      ? Math.round(dateDiff / (24 * 60)) + "일"
      : ""
  } 
    ${
      Math.round(dateDiff / 60) ? (Math.round(dateDiff / 60) % 24) + "시간" : ""
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
    const diff: number = getDateDiffByMinute(newDate, now); //minute 단위
    // console.log(diff);
    setDueDate(newDate);
    setDateDiff(Math.floor(diff));
    
    if (diff <= 0) {
      setErrorNo("DUE_PAST");
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
      setErrorNo("DUE_PAST");
      return;
    }
    setDueDate(currentDate);
    setDateDiff(Math.floor(diff));
  };

  const getOneYearLater = () => {
    const nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    return formatDateStringforTag(nextYear);
  }

  return (
    <>
      <InputLabel>만료 기한</InputLabel>
      <div className="flex flex-col lg:w-full">
        <div className="w-full h-fit flex items-start">
          <input
            className={`text-white h-10 w-42 m-2 p-4 rounded-md bg-picly_darker`}
            type="date"
            onChange={handleDateChange}
            max={getOneYearLater()}
            ref={dateInputRef}/>
          <input
            className={`text-white h-10 w-42 m-2 p-4 rounded-md bg-picly_darker`}
            type="time"
            step={60}
            onChange={handleTimeChange}
            ref={timeInputRef}/>
        </div>
        <p className="h-12 text-center p-2  justify-center">
          {dateDiff > 0 && dueMsg}
        </p>
      </div>
    </>
  );
};

export default DateInput;
