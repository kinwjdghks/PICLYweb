export const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export const formatTimeString = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const dateDiffAsString = (date1: Date, date2: Date): string => {
  if (!(date1 instanceof Date && date2 instanceof Date)) return "not defined";
  const timeDifference = date2.getTime() - date1.getTime();
  // console.log(date2)
  // console.log(date1);
  // console.log('time diff',timeDifference);
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  let result = "";

  if (timeDifference <= 0) {
    return "만료";
  }

  if (daysDifference > 0) {
    result += `${daysDifference}d `;
  }

  if (hoursDifference > 0) {
    result += `${hoursDifference}h`;
  }

  if (result === "") {
    return "0h";
  }

  return "D-" + result;
};

export const getDateDiffByMinute = (date1: Date, date2: Date) =>
  (date1.getTime() - date2.getTime()) / (60 * 1000);

export const checkDateInputValid = (input: Date): boolean => {
  const now = new Date();
  const diff: number = getDateDiffByMinute(input, now);
  if (diff <= 0) return false;
  else return true;
};

export const formatDateStringforTag = (date: Date) => {
  let month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
