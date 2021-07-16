import {Card, Col, Row, Table, Tooltip} from 'antd';
import React from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {FormattedMessage} from "@/.umi/plugin-locale/localeExports";
import {ArrowDownOutlined, ArrowUpOutlined, CaretDownOutlined, InfoCircleOutlined} from "@ant-design/icons";
import ProForm, {
  ProFormSelect,
  ProFormDigit,
  ProFormGroup,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';


const style = {padding: '16px 0'};
export default () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];


  return (
    <PageContainer>
      <div className="site-card-border-less-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="No Fraud Cases" bordered={false} style={{style, background: "#7cb305"}}
                  action={
                    <Tooltip
                      title={
                        <FormattedMessage
                          defaultMessage="Introduce"
                        />
                      }
                    >
                      <InfoCircleOutlined/>
                    </Tooltip>}
            >
              WoW Change12%
              DoD Change11%
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Fraud cases" bordered={false} style={{style, background: "#d4380d"}}>
              WoW Change12%<ArrowUpOutlined/><CaretDownOutlined />
              DoD Change11%<ArrowDownOutlined style={{color :"#fff1f0"}}/>
            </Card>
          </Col>
        </Row>
      </div>
      <div
        style={{
          padding: 24,
        }}
      >
        <ProForm
          name="validate_other"
          initialValues={{
            'input-number': 3,
            dateTimeRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
          }}
          onValuesChange={(_, values) => {
            console.log(values);
          }}
          onFinish={async (value) => console.log(value)}
        >
          <ProFormGroup label="Generate simulation data">
            <ProFormDigit label="Number of transactions" name="input-number" width="sm" min={1}
                          rules={[{ required: true, message: 'Please fill in a number!' }]}/>
            <ProFormSelect
              name="select"
              label="Select"
              valueEnum={{
                adults_2550_female_rural:"adults_2550_female_rural",
                adults_2550_female_urban:"adults_2550_female_urban",
                adults_2550_male_rural:"adults_2550_male_rural",
                adults_2550_male_urban:"adults_2550_male_urban",
                adults_50up_female_rural:"adults_50up_female_rural",
                adults_50up_female_urban:"adults_50up_female_urban",
                adults_50up_male_rural:"adults_50up_male_rural",
                adults_50up_male_urban:"adults_50up_male_urban",
                fraud_adults_2550_female_rural:"fraud_adults_2550_female_rural",
                fraud_adults_2550_female_urban:"fraud_adults_2550_female_urban",
                fraud_adults_2550_male_rural:"fraud_adults_2550_male_rural",
                fraud_adults_2550_male_urban:"fraud_adults_2550_male_urban",
                fraud_adults_50up_female_rural:"fraud_adults_50up_female_rural",
                fraud_adults_50up_female_urban:"fraud_adults_50up_female_urban",
                fraud_adults_50up_male_rural:"fraud_adults_50up_male_rural",
                fraud_adults_50up_male_urban:"fraud_adults_50up_male_urban",
                fraud_leftovers:"fraud_leftovers",
                fraud_young_adults_female_rural:"fraud_young_adults_female_rural",
                fraud_young_adults_female_urban:"fraud_young_adults_female_urban",
                fraud_young_adults_male_rural:"fraud_young_adults_male_rural",
                fraud_young_adults_male_urban:"fraud_young_adults_male_urban",
                young_adults_female_rural:"young_adults_female_rural",
                young_adults_female_urban:"young_adults_female_urban",
                young_adults_male_rural:"young_adults_male_rural",
                young_adults_male_urban:"young_adults_male_urban"
              }}
              placeholder="Please select a group"
              rules={[{ required: true, message: 'Please select one group!' }]}
            />

            <ProFormDateTimeRangePicker
              name="dateTimeRange" label="Duration"
              rules={[{ required: true, message: 'Please select a period of time!' }]}/>
          </ProFormGroup>
        </ProForm>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </PageContainer>
  );
};

