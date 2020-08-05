import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import styled from 'styled-components/native';

import {IInitialState} from '../redux/store';

import {loginUserAction} from '../actions/User.actions';

import CommonLogoComponent from '../components/Common/CommonLogo.component';
import CommonInputComponent from '../components/Common/CommonInput.component';
import CommonButtonComponent from '../components/Common/CommonButton.component';

import * as COLORS from '../utils/colors';
import {AuthScreenContainer} from '../utils/theme';

import useAuthForm from '../hooks/useAuthForm.hook';
import useKeyboard from '../hooks/useKeyboard.hook';

import {AppErrorTypes} from '../enums/App.enums';

const AuthScreen = ({app, loginUser}: ConnectedProps<typeof connector>) => {
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

  const {keyboardIsOpen} = useKeyboard();

  // If data is incorrect - image error
  useEffect(() => {
    if (app.error.type === AppErrorTypes.WARNING) {
      setLoginError(app.error.text);
    }
  }, [app.error, setLoginError]);

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
  app: state.app,
  user: state.user,
});

const mapDispatchToProps = {
  loginUser: (login: string, password: string) =>
    loginUserAction(login, password),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AuthScreen);
