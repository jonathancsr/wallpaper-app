import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage: number) => {
	const width = deviceWidth;
	return (percentage * width) / 100;
};
export const hp = (percentage: number) => {
	const height = deviceHeight;
	return (percentage * height) / 100;
};

export const getColumnCount = () => {
	if (deviceWidth >= 1024) {
		return 4;
	}
	if (deviceWidth >= 768) {
		return 3;
	}
	return 2;
};

export const getImageSize = (width: number, height: number) => {
	if (width > height) {
		return 250;
	}
	if (width < height) {
		return 300;
	}
	return 200;
};
