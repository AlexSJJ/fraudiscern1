import React, {useState, useEffect} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import {
  ProFormSelect,
  ProFormGroup,
} from '@ant-design/pro-form';
import {Line} from '@ant-design/charts';


export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  var config = {
    data: data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {tickCount: 5},
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };
  return (
    <PageContainer>
      <ProFormGroup label="Model&Data">
        <ProFormSelect
          name="model" label="Select Model"
          valueEnum={{}}
          placeholder="Select Model"
          rules={[{required: true, message: 'Please Select Model!'}]}
        />
        <ProFormSelect
          name="Select Data"
          label="Select Data"
          valueEnum={{}}
          placeholder="Please select Data"
          rules={[{required: true, message: 'Please select Data!'}]}
        />

      </ProFormGroup>
      <ProFormGroup label="SelectDataBinding">
        <ProFormSelect
          name="Label"
          label="Label(Category)"
          valueEnum={{}}
          placeholder="Label"
          rules={[{required: true, message: 'Please select X!'}]}
        />
        <ProFormSelect
          name="Features"
          label="Features(Measure)"
          valueEnum={{}}
          placeholder="Features"
          rules={[{required: true, message: 'Please select Features!'}]}
        />
      </ProFormGroup>

    </PageContainer>
  );
};


