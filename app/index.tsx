import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
	Image,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
const WelcomeScreen = () => {
	const router = useRouter();

	function handleStartExplore() {
		router.push("home");
	}
	return (
		<View style={styles.container}>
			<StatusBar />
			<Image
				source={require("../assets/images/welcome.png")}
				style={styles.bgImage}
				resizeMode="cover"
			/>

			{/* Linear Gradient */}
			<Animated.View entering={FadeInDown.duration(600)} style={{ flex: 1 }}>
				<LinearGradient
					colors={[
						"rgba(255,255,255,0)",
						"rgba(255,255,255,0.5)",
						"white",
						"white",
					]}
					style={styles.gradient}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 0.8 }}
				/>
				<View style={styles.contentContainer}>
					<Animated.Text
						entering={FadeInDown.duration(400).springify()}
						style={styles.title}
					>
						Pixels
					</Animated.Text>

					<Animated.Text
						entering={FadeInDown.duration(500).springify()}
						style={styles.punchline}
					>
						Every Pixel Tells a Story
					</Animated.Text>
					<Animated.View entering={FadeInDown.duration(600).springify()}>
						<Pressable onPress={handleStartExplore} style={styles.startButton}>
							<Text style={styles.startText}>Start Explore</Text>
						</Pressable>
					</Animated.View>
				</View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgImage: {
		width: wp(100),
		height: hp(100),
		position: "absolute",
	},
	gradient: {
		width: wp(100),
		height: hp(65),
		bottom: 0,
		position: "absolute",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
		gap: 14,
	},
	title: {
		fontSize: hp(7),
		color: theme.colors.neutral(0.9),
		fontWeight: theme.fontWeights.bold as "bold",
	},
	punchline: {
		fontSize: hp(2),
		letterSpacing: 1,
		marginBottom: 10,
		fontWeight: theme.fontWeights.medium as "medium",
	},
	startButton: {
		marginBottom: 50,
		backgroundColor: theme.colors.neutral(0.9),
		padding: 15,
		paddingHorizontal: 90,
		borderRadius: theme.radius.xl,
		borderCurve: "continuous",
	},
	startText: {
		color: theme.colors.white,
		fontSize: hp(3),
		letterSpacing: 1,
		fontWeight: theme.fontWeights.medium as "medium",
	},
});

export default WelcomeScreen;
