export const getDateTime = (years: number = 0, months: number = 0, dates: number = 0, hours: number = 0, minutes: number = 0): string => {
  const now = new Date();

  now.setFullYear(now.getFullYear() + years);
  now.setMonth(now.getMonth() + months);
  now.setDate(now.getDate() + dates);
  now.setHours(now.getHours() + hours);
  now.setMinutes(now.getMinutes() + minutes);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export const getDate = (years: number = 0, months: number = 0, dates: number = 0): string => {
  const now = new Date();

  now.setFullYear(now.getFullYear() + years);
  now.setMonth(now.getMonth() + months);
  now.setDate(now.getDate() + dates);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
