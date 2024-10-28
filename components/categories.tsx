import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { data } from "../constants/data";

interface CategoriesProps {
	activeCategory: string | null;
	handleChangeCategory: (category: string | null) => void;
}

export default function Categories({
	activeCategory,
	handleChangeCategory,
}: CategoriesProps) {
	return (
		<FlatList
			horizontal
			contentContainerStyle={styles.flatlistContainer}
			data={data.categories}
			keyExtractor={(item) => item}
			renderItem={({ item, index }) => (
				<CategoryItem
					key={index}
					index={index}
					title={item}
					handleChangeCategory={handleChangeCategory}
					isActive={activeCategory === item}
				/>
			)}
		/>
	);
}

interface CategoryItemProps {
	title: string;
	index: number;
	isActive: boolean;
	handleChangeCategory: (category: string | null) => void;
}

const CategoryItem = ({
	title,
	index,
	isActive,
	handleChangeCategory,
}: CategoryItemProps) => {
	const color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
	const backgroundColor = isActive
		? theme.colors.neutral(0.8)
		: theme.colors.white;
	return (
		<Animated.View
			entering={FadeInRight.delay(index * 200)
				.duration(600)
				.springify()
				.damping(14)}
		>
			<Pressable
				style={[styles.category, { backgroundColor }]}
				onPress={() => handleChangeCategory(isActive ? null : title)}
			>
				<Text style={[styles.title, { color }]}>{title}</Text>
			</Pressable>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	flatlistContainer: {
		paddingHorizontal: wp(4),
		gap: 8,
	},
	category: {
		padding: 12,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: theme.colors.grayBG,
		borderRadius: theme.radius.lg,
		borderCurve: "continuous",
	},
	title: {
		fontSize: hp(1.8),
		fontWeight: theme.fontWeights.medium,
	},
});
