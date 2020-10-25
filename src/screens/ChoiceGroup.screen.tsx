import React, {useEffect, useState} from 'react';
import * as RN from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {IInitialState} from '../redux/store';

import {loadGroupsAction} from '../actions/App.actions';

import {IGroup} from '../models/Group.model';

import CommonInputComponent from '../components/Common/CommonInput.component';
import CommonButtonComponent from '../components/Common/CommonButton.component';

import theme from '../utils/theme';
import CommonTextComponent from '../components/Common/CommonText.component';
import {setUserGroupAction} from '../actions/User.actions';
import {updateScheduleAction} from '../actions/Shedule.actions';

import styles from './ChoiceGroup.styles';

const GroupSeparator = React.memo(() => <RN.View style={styles.separator} />);

const ChoiceGroupScreen: React.FC<ConnectedProps<typeof connector>> = ({
  app,
  user,
  loadGroups,
  updateUserGroup,
  updateSchedule,
}) => {
  const navigation = useNavigation();
  const [searchGroupValue, setSearchGroupValue] = useState('');

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const handleSelectUserGroup = (group: IGroup) => {
    updateSchedule(group.title);
    updateUserGroup(group);

    navigation.navigate('Settings');
  };

  const currGroups = app.groups.filter((group: IGroup) =>
    group.title.includes(searchGroupValue.toLowerCase()),
  );

  return (
    <>
      <RN.View style={[theme.screen, styles.container]}>
        <RN.View style={styles.content}>
          <CommonInputComponent
            value={searchGroupValue}
            onChangeText={setSearchGroupValue}
            error=""
            placeholder="Введите название группы ..."
          />

          <RN.FlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            endFillColor="transtarent"
            overScrollMode="never"
            style={styles.groupsList}
            data={currGroups}
            ItemSeparatorComponent={GroupSeparator}
            renderItem={({item}) => (
              <RN.TouchableOpacity
                key={item.id}
                activeOpacity={0.6}
                delayPressIn={0}
                onPress={handleSelectUserGroup.bind(null, item)}
                style={styles.groupContainer}>
                <CommonTextComponent key={item.id}>
                  {item.title.toUpperCase()}
                </CommonTextComponent>
              </RN.TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </RN.View>
        <RN.View style={styles.footer}>
          <CommonButtonComponent text="Загрузить группы" onClick={loadGroups} />
        </RN.View>
      </RN.View>
    </>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  user: state.user,
});

const mapDispatchToProps = {
  loadGroups: () => loadGroupsAction(),
  updateUserGroup: setUserGroupAction,
  updateSchedule: updateScheduleAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ChoiceGroupScreen);
