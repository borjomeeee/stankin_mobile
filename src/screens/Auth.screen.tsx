import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import styled from 'styled-components/native';

import {IInitialState} from '../redux/store';

import {loginUserAction} from '../actions/User.actions';
import {downloadSheduleAction} from '../actions/Shedule.actions';
import {clearErrorAction} from '../actions/App.actions';

import CommonLogoComponent from '../components/CommonLogo.component';
import CommonInputComponent from '../components/CommonInput.component';
import CommonButtonComponent from '../components/CommonButton.component';

import * as COLORS from '../utils/colors';
import {AuthScreenContainer} from '../utils/theme';

import useAuthForm from '../hooks/useAuthForm.hook';

import {AppErrorTypes} from '../enums/App.enums';

const AuthScreen = ({app, loginUser}: ConnectedProps<typeof connector>) => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  const {
    loginText,
    changeLoginText,

    loginError,
    setLoginError,

    passwordText,
    changePasswordText,

    passwordError,

    checkValid,
  } = useAuthForm();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardIsOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardIsOpen(false));

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  useEffect(() => {
    if (app.error.type === AppErrorTypes.WARNING) {
      setLoginError(app.error.text);
    }
  }, [app.error]);

  const onConfirmPassword = () => {
    if (checkValid()) {
      loginUser(loginText, passwordText);
    }
  };

  return (
    <AuthScreenContainer>
      <AuthScreenContent>
        <CommonLogoComponent />

        <AuthForm>
          <AuthFormLabel>Введите данные от ЭОС-а</AuthFormLabel>

          <AuthFormInput
            value={loginText}
            onChangeText={changeLoginText}
            error={loginError}
            placeholder="Login"
          />
          <AuthFormInput
            value={passwordText}
            onChangeText={changePasswordText}
            secureTextEntry={true}
            onSubmitEditing={onConfirmPassword}
            error={passwordError}
            placeholder="Password"
          />

          <AuthFormButton>
            <CommonButtonComponent text="Войти" onClick={onConfirmPassword} />
          </AuthFormButton>
        </AuthForm>

        {!keyboardIsOpen && (
          <FooterText>
            * Для входа в приложение используйте логин и пароль от ЭОС
          </FooterText>
        )}
      </AuthScreenContent>
    </AuthScreenContainer>
  );
};

// Components
const AuthScreenContent = styled.View`
  flex: 1;
  max-width: 400px;

  justify-content: space-between;
`;

const AuthForm = styled.View`
  margin-bottom: 10px;
`;

const AuthFormLabel = styled.Text`
  font-size: 16px;
`;

const AuthFormInput = styled(CommonInputComponent)`
  margin-top: 20px;
`;

const AuthFormButton = styled.View`
  margin-top: 35px;
  align-self: center;
`;

const FooterText = styled.Text`
  flex-wrap: wrap;
  color: ${COLORS.MEDIUM_GRAY};
  font-size: 12px;
  text-align: center;
`;

// State
const mapStateToProps = (state: IInitialState) => ({
  user: state.user,
  app: state.app,
});

const mapDispatchToProps = {
  loginUser: (login: string, password: string) =>
    loginUserAction(login, password),
  downloadShedule: (login: string, password: string, group: string) =>
    downloadSheduleAction(login, password, group),
  clearError: () => clearErrorAction(),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AuthScreen);
