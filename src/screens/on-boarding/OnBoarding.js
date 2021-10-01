// LIBS
import React, {useState, useEffect} from 'react';

// React Native Components
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, SIZES, images, dummyData} from '../../constants';

const OnBoarding = () => {
  // States
  const [completed, setCompleted] = useState(false);

  // Initial animation
  const scrollX = new Animated.Value(0);

  const animatedScrollX = new Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  useEffect(() => {
    scrollX.addListener(({value}) => {
      console.log(Math.floor(value / SIZES.width))
      if (
        Math.floor(value / SIZES.width) ===
        dummyData.onBoardings.length - 1
      ) {
        setCompleted(true);
      }
    });
    return () => scrollX.removeListener();
  }, []);
  const renderContent = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        decelerationRate={0}
        scrollEventThrottle={16}
        onScroll={animatedScrollX}
        showsHorizontalScrollIndicator={false}>
        {dummyData.onBoardings.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              {/* Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={item.img}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>

              {/* Title */}
              <View style={styles.titleContainer}>
                <Text style={styles.titleStyle}>{item.title}</Text>
                <Text style={styles.descriptionStyle}>{item.description}</Text>
              </View>

              {/* Buttons */}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => console.log('Skip')}>
                <Text style={styles.skipStyle}>
                  {completed ? "Let's go" : 'SKip'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = new Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        {dummyData.onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              opacity={opacity}
              key={`dot-${index}`}
              style={[styles.dot, {width: dotSize, height: dotSize}]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  itemContainer: {
    width: SIZES.width,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    position: 'absolute',
    bottom: '10%',
    left: 40,
    right: 40,
  },
  titleStyle: {
    ...FONTS.h1,
    color: COLORS.gray,
    textAlign: 'center',
  },
  descriptionStyle: {
    ...FONTS.body3,
    textAlign: 'center',
    marginTop: SIZES.base,
    color: COLORS.gray,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.padding * 3,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '22%' : '16%',
  },
  buttonContainer: {
    backgroundColor: COLORS.blue,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 150,
    height: 60,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingLeft: 20,
  },
  skipStyle: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default OnBoarding;
