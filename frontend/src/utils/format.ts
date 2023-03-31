// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (date: string | number) => dayjs(date).add(9, 'hour').format('MMMM D, YYYY h:mm A');
