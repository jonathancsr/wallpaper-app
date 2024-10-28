import { getColumnCount, wp } from "@/helpers/common";
import { MasonryFlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ImageCard } from "./image-card";

export default function ImageGrid({ images }: { images: any[] }) {
	const columns = getColumnCount();
	return (
		<View style={styles.container}>
			<MasonryFlashList
				data={images}
				numColumns={columns}
				contentContainerStyle={styles.listContainerStyle}
				renderItem={({ item, index }) => (
					<ImageCard item={item} index={index} columns={columns} />
				)}
				estimatedItemSize={200}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: 3,
		width: wp(100),
	},
	listContainerStyle: {
		paddingHorizontal: wp(4),
	},
});
