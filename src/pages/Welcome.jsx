import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, message, Upload} from 'antd';
import {useIntl }  from 'umi';
import {InboxOutlined} from '@ant-design/icons';


const {Dragger} = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'http://127.0.0.1:5000/csvdata',
  onChange(info) {
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default () => {

  useIntl();
  return (
    <PageContainer>
      <Card>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
      </Card>
    </PageContainer>
  );
};
