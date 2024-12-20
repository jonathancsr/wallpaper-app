import { apiCall } from "@/api";
import Categories from "@/components/categories";
import ImageGrid from "@/components/image-grid";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
let page = 1;
const Home = () => {
	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [images, setImages] = useState<any[]>([]);
	const searchInputRef = useRef(null);

	const { top } = useSafeAreaInsets();
	const paddingTop = top > 0 ? top + 10 : 30;

	useEffect(() => {
		fetchImages();
	}, []);

	const fetchImages = async (params = { page: 1 }, append = false) => {
		const res = await apiCall(params);
		if (res.success && res?.data?.hits) {
			if (append) setImages((prev) => [...prev, ...res.data.hits]);
			else setImages([...res.data.hits]);
		}
	};
	const handleChangeCategory = (category: string | null) => {
		setActiveCategory(category);
		clearSearch();
		setImages([]);
		page = 1;
		let params = {
			page,
		};
		if (category) params.category = category;
		fetchImages(params, false);
	};

	const handleSearch = (text: string) => {
		setSearch(text);
		page = 1;
		setImages([]);

		if (text.length > 2) {
			fetchImages({ page, q: text });
		}

		if (text === "") {
			fetchImages({ page });
		}
	};

	const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

	const clearSearch = () => {
		handleSearch("");
		searchInputRef?.current?.clear();
	};

	return (
		<View style={[styles.container, { paddingTop }]}>
			<View style={styles.header}>
				<Pressable>
					<Text style={styles.title}>Pixels</Text>
				</Pressable>
				<Pressable>
					<FontAwesome6
						name="bars-staggered"
						size={22}
						color={theme.colors.neutral(0.7)}
					/>
				</Pressable>
			</View>
			<ScrollView contentContainerStyle={{ gap: 15 }}>
				<View style={styles.searchBar}>
					<View style={styles.searchIcon}>
						<Feather
							name="search"
							size={24}
							color={theme.colors.neutral(0.4)}
						/>
					</View>
					<TextInput
						placeholder="Search for photos..."
						style={styles.searchInput}
						onChangeText={handleTextDebounce}
						ref={searchInputRef}
					/>
					{search && (
						<Pressable style={styles.closeIcon} onPress={clearSearch}>
							<Ionicons
								name="close"
								size={24}
								color={theme.colors.neutral(0.6)}
							/>
						</Pressable>
					)}
				</View>
				<View style={styles.categories}>
					<Categories
						activeCategory={activeCategory}
						handleChangeCategory={handleChangeCategory}
					/>
				</View>
				<View>{images.length > 0 && <ImageGrid images={images} />}</View>
			</ScrollView>
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
	title: {
		fontSize: hp(4),
		fontWeight: theme.fontWeights.semibold as "semibold",
		color: theme.colors.neutral(0.9),
	},
	searchBar: {
		marginHorizontal: wp(4),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 1,
		borderColor: theme.colors.grayBG,
		backgroundColor: theme.colors.white,
		padding: 6,
		paddingLeft: 10,
		borderRadius: theme.radius.lg,
	},
	searchIcon: {
		padding: 8,
	},
	searchInput: {
		flex: 1,
		borderRadius: theme.radius.lg,
		paddingVertical: 10,
		fontSize: hp(1.8),
	},
	closeIcon: {
		backgroundColor: theme.colors.neutral(0.1),
		padding: 8,
		borderRadius: theme.radius.sm,
	},
	categories: {},
});

export default Home;
