type TNameStyle = 'short' | 'long' | 'narrow';

const formatDate = (
	date: Date,
	dayNameStyle: TNameStyle = 'short',
	monthNameStyle: TNameStyle = 'short',
	locale = 'en-US'
) => {
	const dayName = date.toLocaleString(locale, {
		weekday: dayNameStyle,
	});
	const monthName = date.toLocaleString(locale, {
		month: monthNameStyle,
	});
	return [dayName, date.getDate(), monthName, date.getFullYear()];
};

export default formatDate;
