let currentId = 0;

export const generateUniqueId = () => {
  currentId++;
  return currentId.toString().padStart(3, "0");
};
export const getTimeString = (second) => {
  const min = Math.floor(second / 60);
  const sec = second % 60;
  let timeString = min
    ? `${min.toString().padStart(2, "0")} min ${sec
        .toString()
        .padStart(2, "0")} sec`
    : `${sec.toString().padStart(2, "0")} sec`;
  return timeString;
};
