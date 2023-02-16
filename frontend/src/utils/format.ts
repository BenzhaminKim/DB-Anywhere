// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (date: number) => dayjs(date).format('MMMM D, YYYY h:mm A');
