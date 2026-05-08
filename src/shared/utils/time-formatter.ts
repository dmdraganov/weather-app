import type { Language } from '../../modules/localization/localization.model';

export const formatTo24Hour = (time: string) => {
  const [timePart, period] = time.split(' ');
  const [hours, minutes] = timePart.split(':');

  let hour = Number(hours);

  if (period === 'PM' && hour !== 12) {
    hour += 12;
  }

  if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  return `${String(hour).padStart(2, '0')}:${minutes}`;
};

export const formatHourTime = (date: Date, locale: Language): string => {
  return Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};
