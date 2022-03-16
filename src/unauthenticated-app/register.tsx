/**
 * Created by jason on 2022/3/12.
 */
import React from 'react';
import {useAuth} from '../context/auth-context';
import {Form, Input} from 'antd';
import {LongButton} from './index';
import {useAsync} from '../utils/use-async';

export const RegisterScreen = ({onError}: { onError: (error: Error) => void }) => {
  const {register} = useAuth();
  const {run, isLoading} = useAsync(undefined, {throwOnError: true});

  const handleSubmit = ({
                          second_password,
                          ...values
                        }: { username: string, password: string, second_password: string }) => {
    if (second_password !== values.password) {
      onError(new Error('请输入相同密码'));
      return;
    }
    run(register(values)).catch(e => onError(e));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{required: true, message: '请输入用户名'}]}>
        <Input type={'text'} id={'username'} placeholder={'用户名'}/>
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{required: true, message: '请输入密码'}]}>
        <Input id={'password'} type={'password'} placeholder={'密码'}/>
      </Form.Item>
      <Form.Item
        name={'second_password'}
        rules={[{required: true, message: '请确认密码'}, ({getFieldValue}) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            } else {
              return Promise.reject(new Error('两次输入的密码不一样'));
            }
          }
        })]}>
        <Input id={'second_password'} type={'password'} placeholder={'确认密码'}/>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
