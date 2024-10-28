import { theme } from "@/constants/theme";
import { wp } from "@/helpers/common";
import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Home = () => {
	const { top } = useSafeAreaInsets();
	const paddingTop = top > 0 ? top + 10 : 30;
	return (
		<View style={[styles.container, { paddingTop }]}>
			<View style={styles.header}>
				<Pressable>
					<Text>Pixels</Text>
				</Pressable>
				<Pressable>
					<FontAwesome6
						name="bars-staggered"
						size={22}
						color={theme.colors.neutral(0.7)}
					/>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 15,
	},
	header: {
		marginHorizontal: wp(4),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default Home;
