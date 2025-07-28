export const formattingTimeHelper = (date: Date) => {
  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return time;
};
