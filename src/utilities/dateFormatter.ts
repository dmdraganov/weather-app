type NameStyle = 'short' | 'long' | 'narrow';

const formatDate = (
	date: Date,
	dayNameStyle: NameStyle = 'short',
	monthNameStyle: NameStyle = 'short',
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
