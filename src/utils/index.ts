import dayjs from 'dayjs';
import zh from 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale(zh);

export const format = (date: Date, format: string = 'YYYY:MM:DD') => dayjs(date).format(format);
