import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {Button, withTheme} from 'react-native-paper';

import {StyleProp, TextStyle} from 'react-native';

import styled from 'styled-components/native';

import {IInitialState} from '../redux/store';

import {loginUserAction} from '../actions/User.actions';

import CommonLogoComponent from '../components/Common/CommonLogo.component';
import CommonInputComponent from '../components/Common/CommonInput.component';

import {AuthScreenContainer} from '../utils/theme';

import useAuthForm from '../hooks/useAuthForm.hook';
import useKeyboard from '../hooks/useKeyboard.hook';

import {AppErrorTypes} from '../enums/App.enums';

const AuthScreen: React.FC<
  ConnectedProps<typeof connector> & {theme: ReactNativePaper.Theme}
> = ({app, loginUser, theme}) => {
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

  const buttonStyles: StyleProp<TextStyle> = {
    ...theme.fonts.medium,
    letterSpacing: 0.4,
  };

  const footerStyles: StyleProp<TextStyle> = {
    color: theme.colors.darkGray,
  };

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

          <CommonInputComponent
            label="Логин"
            value={loginText}
            onChangeText={changeLoginText}
            error={!!loginError}
            errorValue={loginError}
          />
          <CommonInputComponent
            label="Пароль"
            value={passwordText}
            onChangeText={changePasswordText}
            secureTextEntry={true}
            onSubmitEditing={onConfirmPassword}
            error={!!passwordError}
            errorValue={passwordError}
          />

          <AuthFormButton>
            <Button
              mode="contained"
              onPress={onConfirmPassword}
              labelStyle={buttonStyles}>
              Войти
            </Button>
          </AuthFormButton>
        </AuthForm>

        {!keyboardIsOpen && (
          <FooterText style={footerStyles}>
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

const AuthForm = styled.View``;

const AuthFormLabel = styled.Text`
  font-size: 16px;

  margin-bottom: 20px;
`;

const AuthFormButton = styled.View`
  margin-top: 20px;
  align-self: center;
`;

const FooterText = styled.Text`
  flex-wrap: wrap;

  font-size: 12px;

  text-align: center;
`;

// State
const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  user: state.user,
});

const mapDispatchToProps = {
  loginUser: loginUserAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withTheme(connector(AuthScreen));
