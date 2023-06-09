const capitalize = str => {
	return (str + '').charAt(0).toUpperCase() + str.substring(1);
};

export const utilsService = {
	capitalize,
};
