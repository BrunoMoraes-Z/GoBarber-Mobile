import React, { useCallback, useRef } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const mailInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'A senha deve conter mais de seis dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        Alert.alert('Cadastro realizado com sucesso!', 'Você já pode fazer login na aplicação.');

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer o login. Verifique as credenciais.');
      }
    },
    [navigation],
  );
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
                autoCompleteType="name"
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
                autoCompleteType="email"
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
                autoCompleteType="password"
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
