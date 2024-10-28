import { theme } from "@/constants/theme";
import { getImageSize, wp } from "@/helpers/common";
import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

export const ImageCard = ({ item, index, columns }) => {
	const isLastInRow = () => {
		return (index + 1) % columns === 0;
	};

	const getDynamicHeight = () => {
		const { imageHeight: height, imageWidth: width } = item;
		return {
			height: getImageSize(width, height),
		};
	};

	return (
		<Pressable style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
			<Image
				style={[styles.image, getDynamicHeight()]}
				source={{ uri: item?.webformatURL }}
				transition={200}
			/>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	image: {
		height: 300,
		width: "100%",
	},
	imageWrapper: {
		backgroundColor: theme.colors.grayBG,
		borderRadius: theme.radius.xl,
		borderCurve: "continuous",
		overflow: "hidden",
		marginBottom: wp(2),
	},
	spacing: {
		marginRight: wp(2),
	},
});
