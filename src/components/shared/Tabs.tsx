import React, {FC, memo, useState, useCallback, useMemo} from 'react';
import {Dimensions, StatusBar, Animated, Pressable} from 'react-native';
import {TabViewProps, TabView, SceneMap} from 'react-native-tab-view';
import {useColorModeValue, Box} from 'native-base';

export interface TabsProps {
  items: {
    key: string;
    label: string;
    component: FC;
  }[];
}

const Tabs: FC<TabsProps> = ({items}) => {
  const width = useMemo(() => Dimensions.get('window').width, []);
  const [index, setIndex] = useState(0);
  const routes = useMemo(
    () =>
      items.map(item => ({
        key: item.key,
        label: item.label,
      })),
    [items],
  );
  const renderScene = useMemo(
    () =>
      SceneMap(
        items.reduce(
          (obj, item) => Object.assign(obj, {[item.key]: item.component}),
          {},
        ),
      ),
    [items],
  );

  const renderTabBar = useCallback<
    TabViewProps<Omit<TabsProps['items'][number], 'component'>>['renderTabBar']
  >(
    ({navigationState, position}) => {
      const inputRange = navigationState.routes.map((x, i) => i);

      return (
        <Box flexDirection="row">
          {navigationState.routes.map((route, i) => {
            const opacity = position.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === i ? 1 : 0.5,
              ),
            });
            const color =
              index === i
                ? // eslint-disable-next-line react-hooks/rules-of-hooks
                  useColorModeValue('#000', '#e5e5e5')
                : // eslint-disable-next-line react-hooks/rules-of-hooks
                  useColorModeValue('#1f2937', '#a1a1aa');
            const borderColor =
              index === i
                ? 'cyan.500'
                : // eslint-disable-next-line react-hooks/rules-of-hooks
                  useColorModeValue('coolGray.200', 'gray.400');
            return (
              <Box
                key={route.key}
                borderBottomWidth="3"
                borderColor={borderColor}
                flex={1}
                alignItems="center"
                p="3">
                <Pressable
                  onPress={() => {
                    setIndex(i);
                  }}>
                  <Animated.Text
                    style={{
                      color,
                      opacity,
                    }}>
                    {route.label}
                  </Animated.Text>
                </Pressable>
              </Box>
            );
          })}
        </Box>
      );
    },
    [index],
  );

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{
        width,
      }}
      style={{
        marginTop: StatusBar.currentHeight,
      }}
    />
  );
};

export default memo(Tabs);
