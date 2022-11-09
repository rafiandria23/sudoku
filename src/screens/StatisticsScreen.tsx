import React, {FC} from 'react';
import {Text} from 'native-base';

// Components
import {Tabs} from '@/components/shared';

const CP: FC = () => <Text>Games</Text>;

const StatisticsScreen: FC = () => {
  return (
    <Tabs
      items={[
        {
          key: 'easy',
          label: 'Easy',
          component: CP,
        },
        {
          key: 'medium',
          label: 'Medium',
          component: CP,
        },
        {
          key: 'hard',
          label: 'Hard',
          component: CP,
        },
      ]}
    />
  );
};

export default StatisticsScreen;
