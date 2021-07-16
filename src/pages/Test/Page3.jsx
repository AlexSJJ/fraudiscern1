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
      <ProFormGroup label="Date&VisualizationType">
        <ProFormSelect
          name="Select Data"
          label="Select Data"
          valueEnum={{}}
          placeholder="Please select Data"
          rules={[{required: true, message: 'Please select Data!'}]}
        />
        <ProFormSelect
          name="VisualizationType" label="Select Visualization Type"
          valueEnum={{}}
          placeholder="Select Visualization Type"
          rules={[{required: true, message: 'Please select Visualization Type!'}]}
        />
      </ProFormGroup>
      <ProFormGroup label="DataBindingOption">
        <ProFormSelect
          name="X"
          label="x(Category)"
          valueEnum={{}}
          placeholder="Please select X"
          rules={[{required: true, message: 'Please select X!'}]}
        />
        <ProFormSelect
          name="Y"
          label="Y(Measure)"
          valueEnum={{}}
          placeholder="Please select Y"
          rules={[{required: true, message: 'Please select Y!'}]}
        />
      </ProFormGroup>
      <Line {...config} />
    </PageContainer>
  );
};


