import React, {FC, memo, useCallback} from 'react';
import {Alert, Keyboard} from 'react-native';
import {VStack, HStack, Input} from 'native-base';
import update from 'immutability-helper';

// Types
import type {Game} from '@/types';

// Constants
import {BoardConstant} from '@/constants';

export interface BoardProps {
  board: Game['board'];
  onChange(board: Game['board']): void | Promise<void>;
}

const Board: FC<BoardProps> = ({board, onChange}) => {
  const handleChange = useCallback(
    (text: string, coordinate: [number, number]) => {
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
            onChange(
              update(board, {
                [coordinate[0]]: {
                  [coordinate[1]]: {
                    value: {
                      $set: Number(text),
                    },
                  },
                },
              }),
            );
          }
          break;
      }

      Keyboard.dismiss();
    },
    [board, onChange],
  );

  const renderBoard = () => {
    let idxKey = 1;
    const boardContainer = board.map((row, rowIdx) => {
      idxKey++;
      const columns = row.map((col, colIdx) => {
        idxKey++;
        if (col.value > 0) {
          return (
            <Input
              key={colIdx}
              onChangeText={text => handleChange(text, [rowIdx, colIdx])}
              value={String(col.value)}
              keyboardType="number-pad"
              isReadOnly={!col.editable}
              width={BoardConstant.CellSize}
              height={BoardConstant.CellSize}
              fontSize="4xl"
              textAlign="center"
              borderWidth="0"
              borderRadius="none"
              borderRightWidth="1"
              borderTopWidth="1"
            />
          );
        } else {
          return (
            <Input
              key={colIdx}
              onChangeText={text => handleChange(text, [rowIdx, colIdx])}
              keyboardType="number-pad"
              isReadOnly={!col.editable}
              width={BoardConstant.CellSize}
              height={BoardConstant.CellSize}
              fontSize="4xl"
              textAlign="center"
              borderWidth="0"
              borderRadius="none"
              borderRightWidth="1"
              borderTopWidth="1"
            />
          );
        }
      });

      return (
        <HStack key={idxKey} space="0">
          {columns}
        </HStack>
      );
    });

    return boardContainer;
  };

  return (
    <VStack space="0" justifyContent="center" alignItems="center">
      {renderBoard()}
    </VStack>
  );
};

export default memo(Board);
