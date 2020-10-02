import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {IInitialState} from '../redux/store';

import {AppErrorTypes} from '../enums/App.enums';

import LoadingScreen from '../screens/Loading.screen';
import AppModalScreen from '../screens/AppModal.screen';

interface IAppWrapperComponentProps extends ConnectedProps<typeof connector> {}

const AppWrapperComponent: React.FC<IAppWrapperComponentProps> = ({
  children,

  loading,
  error,
}) => {
  return (
    <>
      {children || <></>}

      {error.type !== AppErrorTypes.NONE && <AppModalScreen />}
      {loading && <LoadingScreen />}
    </>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  loading: state.app.isLoading,
  error: state.app.error,
});

const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AppWrapperComponent);
