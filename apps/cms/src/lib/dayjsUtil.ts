import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// 获取UTC时间
export const formatToUtcTime = (originalDate: Date | string) => {
  const utcTime = dayjs(originalDate).utc().format("YYYY-MM-DD HH:mm:ss");

  return utcTime;
};
// 获取用户时区时间
