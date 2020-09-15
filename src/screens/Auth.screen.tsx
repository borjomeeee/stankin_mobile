import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {compose} from 'redux';

import * as RN from 'react-native';

import {IInitialState} from '../redux/store';

import {loginUserAction} from '../actions/User.actions';

import CommonInputComponent from '../components/Common/CommonInput.component';

import theme from '../utils/theme';

import CommonTextComponent from '../components/Common/CommonText.component';

import styles from './Auth.styles';
import {clearErrorAction} from '../actions/App.actions';
import CommonButtonComponent from '../components/Common/CommonButton.component';

import {AppErrorTypes} from '../enums/App.enums';

const monkeyClose = require('../static/images/monkey-close.png');
const monkeyOpen = require('../static/images/monkey-open.png');

type IAuthFormInputs = 'login' | 'password';

type IAuthScreenForm = {
  [I in IAuthFormInputs]: {
    value: string;
    error: string;

    isSecure: boolean;
    isRequired: boolean;
  };
};

interface IAuthScreenComponentProps extends ConnectedProps<typeof connector> {}
interface IAuthScreenComponentState {
  form: IAuthScreenForm;
}

const AuthScreenComponent: React.FC<IAuthScreenComponentProps> = ({
  error,

  loginUser,
  clearError,
}) => {
  // State
  const [formData, setFormData] = React.useState<IAuthScreenForm>({
    login: {
      value: '',
      error: '',
      isSecure: false,
      isRequired: true,
    },
    password: {
      value: '',
      error: '',
      isSecure: true,
      isRequired: true,
    },
  });

  // Update
  React.useEffect(() => {
    if (error.type !== AppErrorTypes.NONE) {
      setFormData((state) => ({
        ...state,
        login: {...state.login, error: error.text, value: ''},
        password: {...state.password, value: ''},
      }));
      clearError();
    }
  }, [error, clearError]);

  // Methods
  const handleChangeInputValue = React.useMemo(
    () => (key: keyof IAuthScreenForm, value: string): void => {
      setFormData((state) => ({
        ...state,
        [key]: {...state[key], value, error: ''},
      }));
    },
    [],
  );

  const handleChangeLoginInputValue = React.useCallback(
    (value: string) => {
      handleChangeInputValue('login', value);
    },
    [handleChangeInputValue],
  );

  const handleChangePasswordInputValue = React.useCallback(
    (value: string) => {
      handleChangeInputValue('password', value);
    },
    [handleChangeInputValue],
  );

  const checkEmptyInput = (key: IAuthFormInputs, value: string): boolean => {
    if (value.length === 0) {
      setFormData((state) => ({
        ...state,
        [key]: {...state[key], error: 'Поле не должно быть пустым'},
      }));
      return true;
    }
    return false;
  };

  const checkValudForm = () => {
    const checkEmptyInputCallback = (key: IAuthFormInputs) =>
      checkEmptyInput(key, formData[key].value);

    return !(Object.keys(formData) as IAuthFormInputs[])
      .filter((value: IAuthFormInputs) => formData[value].isRequired)
      .sort()
      .some(checkEmptyInputCallback);
  };

  const handleToggleShowPassword = () => {
    setFormData((state) => ({
      ...state,
      password: {
        ...state.password,
        isSecure: !state.password.isSecure,
      },
    }));
  };

  const handleSubmitAuthForm = () => {
    if (!checkValudForm()) {
      return;
    }

    loginUser(formData.login.value, formData.password.value);
  };

  // Vars
  const titleStyles: RN.StyleProp<RN.TextStyle> = React.useMemo(
    () => ({
      fontFamily: theme.fonts.bold.fontFamily,
      fontSize: 20,
    }),
    [],
  );

  const monkeyImage = React.useMemo(
    () => (formData.password.isSecure ? monkeyClose : monkeyOpen),
    [formData.password.isSecure],
  );

  const buttonStyles: RN.StyleProp<RN.ViewStyle> = React.useMemo(
    () => ({
      marginTop: 25,
    }),
    [],
  );

  return (
    <RN.View style={[styles.container, theme.screen]}>
      <CommonTextComponent style={titleStyles}>
        Станкин. Расписание
      </CommonTextComponent>

      <RN.View style={styles.inputs}>
        <CommonInputComponent
          icon="account-outline"
          value={formData.login.value}
          error={formData.login.error}
          onChangeText={handleChangeLoginInputValue}
          placeholder="Логин"
          secureTextEntry={false}
          containerStyles={styles.loginInputContainer}
        />
        <CommonInputComponent
          icon="lock"
          placeholder="Пароль"
          value={formData.password.value}
          error={formData.password.error}
          onChangeText={handleChangePasswordInputValue}
          secureTextEntry={formData.password.isSecure}
          containerStyles={styles.passwordInputContainer}
          rightIcon={
            <RN.TouchableOpacity
              delayPressIn={0}
              activeOpacity={0.5}
              style={styles.monkeyIcon}
              onPress={handleToggleShowPassword}>
              <RN.Image source={monkeyImage} />
            </RN.TouchableOpacity>
          }
        />
      </RN.View>

      <CommonButtonComponent
        text="Войти"
        onClick={handleSubmitAuthForm}
        style={buttonStyles}
      />
    </RN.View>
  );
};

// State
const mapStateToProps = (state: IInitialState) => ({
  error: state.app.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: compose(dispatch, loginUserAction),
  clearError: compose(dispatch, clearErrorAction),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AuthScreenComponent);
