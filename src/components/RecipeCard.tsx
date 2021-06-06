import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity, ImageBackground, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { shadowStyle, colorPalette } from "../constants/ColorPalette";
import { disableScroll, enableScroll } from "../redux/actions";
const _screen = Dimensions.get("screen");

export default function RecipeCard({ id, rcp, }: RecipeCardParamList) {
  const filtersState = useSelector<RootState, FiltersState>(
    (state) => state.filtersState
  );
  const [isScrollEnabled, setIsScrollEnabled] = React.useState<boolean>(false);
  const scrollState = useSelector<RootState, EnableScrollState>(
    (state) => state.enableScrollState
  ); 
  const scrollInfoRef = useRef<any>();
  const dispatch = useDispatch();


  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Animated.ScrollView ref={scrollInfoRef}
        style={{flex: 1}}
          centerContent={true}
          directionalLockEnabled
          scrollEnabled={scrollState.enable}
          onTouchStart={() => {dispatch(enableScroll())}}
        >
          {rcp.image ? (
            <ImageBackground
              key={id}
              source={{ uri: rcp.image || " " }}
              style={styles.picture}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.titleBackground}>{rcp.title}</Text>
              </View>
            </ImageBackground>
          ) : (
              <View style={styles.pictureUnavailableContainer}>
                <Text style={styles.pictureUnavailable}>
                  Picture unavailable for this recipe 😟 But believe us, it's
              delicious!🍽{" "}
                </Text>
              </View>
            )}

        <View style={styles.rcpInfoContainer}>
          <Text style={styles.rcpInfo}>
            Type:{" "}
            {filtersState.filters.dishType
              ? filtersState.filters.dishType[0].toUpperCase() +
                filtersState.filters.dishType.slice(1)
              : rcp.dishTypes.length === 0
              ? "Many"
              : rcp.dishTypes[0][0].toUpperCase() + rcp.dishTypes[0].slice(1)}
          </Text>
          <Text style={styles.rcpInfo}>
            Cuisine:{" "}
            {filtersState.filters.cuisine
              ? filtersState.filters.cuisine[0].toUpperCase() +
                filtersState.filters.cuisine.slice(1)
                : rcp.cuisines.length === 0
                  ? "World Food"
                  : rcp.cuisines[0]}
            </Text>
            <Text style={styles.rcpInfo}>
              Dairy-free:{rcp.dairyFree ? " ✅  " : " ❌ "}
            </Text>
            <Text style={styles.rcpInfo}>
              Gluten-free:{rcp.glutenFree ? " ✅  " : " ❌ "}
            </Text>
            <Text style={styles.rcpInfo}>
              Vegetarian:{rcp.vegetarian ? " ✅  " : " ❌ "}
            </Text>
            <Text style={styles.rcpInfo}>
              Vegan:{rcp.vegan ? " ✅  " : " ❌ "}
            </Text>

            <Text style={{ fontWeight: "bold", ...styles.rcpInfo }}>
              Servings: {rcp.servings}
            </Text>
            <Text style={{ fontWeight: "bold", ...styles.rcpInfo }}>
              Prep time: {rcp.readyInMinutes} min
          </Text>
            <Text style={styles.subTitle}>Ingredients</Text>
            {rcp.ingredients.map((ing) => {
              return <Text>{ing}</Text>;
            })}
          </View>
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    height: 400,
    width: 400,
    resizeMode: "cover",
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBackground: {
    color: "black",
    marginTop: 5,
    textAlign: "center",
  },
  titleContainer: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: "white",
    width: 250,
    borderRadius: 15,
    ...shadowStyle,
  },
  subContainer: {
    justifyContent: "center",
    paddingTop: 20,
    alignItems: "center",
    width: _screen.width * 1,
    height: _screen.height * 0.7,
    borderRadius: 30,
    backgroundColor: colorPalette.secondary,
  },
  pictureUnavailable: {
    textAlign: "center",
  },
  pictureUnavailableContainer: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: "white",
    width: 250,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: _screen.height * 0.25,
  },

  rcpInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "white",
    borderRadius: 20,
    width: _screen.width * 0.75,
    marginTop: 10,
    alignContent: "stretch",
    marginBottom: 10,
  },

  rcpInfo: {
    textAlign: "center",
    marginTop: 10,
    width: "50%",
  },
});
