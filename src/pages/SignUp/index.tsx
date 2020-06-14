import React, { useCallback, useRef } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
} from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const mailInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const handleSignUp = useCallback((data: any) => {
    console.log(data);
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => { mailInputRef.current?.focus(); }}
              />

              <Input
                ref={mailInputRef}
                name="email"
                icon="mail"
                autoCorrect={false}
                placeholder="E-mail"
                returnKeyType="next"
                autoCapitalize="none"
                keyboardType="email-address"
                onSubmitEditing={() => { passwordInputRef.current?.focus(); }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                secureTextEntry
                autoCapitalize="none"
                placeholder="Senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => { formRef.current?.submitForm(); }}
              />

              <Button onPress={() => { formRef.current?.submitForm(); }}>Entrar</Button>

            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => { navigation.navigate('SignIn'); }}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>
          Voltar para login
        </BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
