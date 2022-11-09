import React, {FC, useEffect} from 'react';
import {TextInput, View, StyleSheet, Animated, Alert} from 'react-native';

// Types
import type {Game} from '@/types';

// Utils
import {increaseDouble, repeatRandomColors} from '@/utils';

export interface BoardProps {
  board: Game['board'];
}

const animatedValue = new Animated.Value(0);

const Board: FC<BoardProps> = ({board}) => {
  const backgroundColorConfig = animatedValue.interpolate({
    inputRange: increaseDouble(1, 2),
    outputRange: repeatRandomColors(6),
  });

  const startBackgroundColorAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 15000,
        useNativeDriver: false,
      }),
    ).start();
  };

  useEffect(() => {
    startBackgroundColorAnimation();
  }, []);

  useEffect(() => {
    startBackgroundColorAnimation();
  }, [board]);

  const handleNumberChange = (text: string, coordinate: any) => {
    const nums = '123456789';

    switch (text) {
      case ' ':
        Alert.alert('Please enter a number between 1-9!');
        break;

      case '0':
        Alert.alert("You can't enter 0 or zero!");
        break;

      default:
        if (text.length > 1) {
          Alert.alert('Please enter a number between 1-9!');
        } else if (!nums.includes(text)) {
          Alert.prompt('Please enter number type only!');
        } else {
          const boardToChange = [...board];
          boardToChange[coordinate[0]][coordinate[1]].value = Number(text);
        }
        break;
    }
  };

  const renderBoard = () => {
    let indexKey = 1;
    const boardContainer = board.map((row, rowIdx) => {
      indexKey++;
      const columns = row.map((col, colIdx) => {
        indexKey++;
        if (col.value > 0) {
          return (
            <Animated.View
              key={indexKey}
              style={[{backgroundColor: backgroundColorConfig}]}>
              <TextInput
                onChangeText={text =>
                  handleNumberChange(text, [rowIdx, colIdx])
                }
                style={styles.boardItemFilled}
                value={String(col.value)}
                keyboardType="number-pad"
                editable={col.editable}
              />
            </Animated.View>
          );
        } else {
          return (
            <TextInput
              key={indexKey}
              onChangeText={text => handleNumberChange(text, [rowIdx, colIdx])}
              style={styles.boardItem}
              keyboardType="number-pad"
              editable={col.editable}
            />
          );
        }
      });

      return (
        <View key={indexKey} style={styles.boardContainer}>
          {columns}
        </View>
      );
    });
    return <View style={styles.mainContainer}>{boardContainer}</View>;
  };

  return <View>{renderBoard()}</View>;
};

export default Board;

const styles = StyleSheet.create({
  boardItem: {
    width: 40,
    height: 40,
    fontSize: 20,
    borderColor: 'grey',
    borderWidth: 1,
    textAlign: 'center',
  },
  boardItemFilled: {
    width: 40,
    height: 40,
    fontSize: 20,
    color: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    textAlign: 'center',
  },
  boardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 8,
  },
});
