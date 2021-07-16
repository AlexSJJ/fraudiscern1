import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import ProForm, {ProFormText, ProFormCaptcha} from '@ant-design/pro-form';
import {useIntl, Link, history, FormattedMessage, SelectLang, useModel} from 'umi';
import Footer from '@/components/Footer';
import {login, authCode, register} from '@/services/ant-design-pro/api';
import styles from './index.less';
import { MobileOutlined, MailOutlined } from '@ant-design/icons';

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
/** 此方法会跳转到 redirect 参数所在的位置 */

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const {query} = history.location;
    const {redirect} = query;
    history.push(redirect || '/');
  }, 10);
};

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState({});
  const [type, setType] = useState('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const intl = useIntl();

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      // 注册
      console.log(values)
      const msg = await register({...values});
      console.log(msg);
      if (msg.status === 'ok') {
        const defaultloginSuccessMessage = intl.formatMessage({
          id: 'pages.login.successpages.login.success',
          defaultMessage: '注册成功！',
        });
        message.success(defaultloginSuccessMessage);
        // await fetchUserInfo();
        goto();
        return;
      } // 如果失败去设置用户错误信息

      setUserLoginState(msg);
    } catch (error) {
      const defaultloginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultloginFailureMessage);
    }

    setSubmitting(false);
  };

  const {status, type: loginType} = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang/>}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="%PUBLIC_URL%/logo.svg"/>
              <span className={styles.title}>Fraudiscern</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
            })}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.register',
                  defaultMessage: '注册',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              console.log(values.password1 === values.password2)
              if(values.password1 === values.password2){
              message.success('提交成功');
              await handleSubmit(values);}
              else{
                message.success('两次密码不一致，请重新填写');}
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.registerTab',
                  defaultMessage: '注册',
                })}
              />

            </Tabs>


            {type === 'account' && (
              <>
                <ProFormText
                  name="user_name"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.register.user_name.placeholder',
                    defaultMessage: '请输入用户名',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix:<MailOutlined />,
                  }}
                  name="mail"
                  placeholder="请输入邮箱地址"
                  rules={[
                    {
                      required: true,
                      message: '请输入邮箱地址!',
                    },
                    {
                      pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/,
                      message: '不合法的邮箱地址格式!',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix:  <MobileOutlined />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  phoneName="mail"
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ]}
                  placeholder="请输入验证码"


                  onGetCaptcha={async (mail) => {
                    let response = await authCode(mail)
                    if (response.status === "ok") message.success(`邮箱 ${mail} 验证码发送成功!`);
                    if (response.status === "error") message.success(`邮箱 ${mail} 已经注册过，请直接登录!`);
                  }}
                />
                <ProFormText.Password
                  name="password1"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.required',
                    defaultMessage:"请输入密码！",
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password2"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon}/>,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.required',
                    defaultMessage:"请再次输入密码！",
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请再次输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}
          </ProForm>
          <a
            style={{
              float: 'right',
            }}
          >
            <Link to="/user/login">登录</Link>
          </a>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
