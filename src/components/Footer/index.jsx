import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Fraudisern Team出品',
  });
  return (
    <DefaultFooter
      copyright={`2021 ${defaultMessage}`}
      links={[
        {
          key: 'Fraduiscern',
          title: 'Fraduiscern',
          href: 'https://www.fraudiscern.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Fraudiscern',
          title: 'Fraudiscern',
          href: 'https://github.com/Eliseowzy/Fraudiscern',
          blankTarget: true,
        },
      ]}
    />
  );
};
