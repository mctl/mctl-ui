import React, { FC } from 'react';
import { Upload } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import type { UploadEnum, tagType } from './typing'
import type { ObjectEnum } from '../../typing'
import type { UploadRequestOption } from 'rc-upload/lib/interface'

interface UploadFileProps{
  uploadProps: UploadEnum;
  editHandler: (tag: tagType, prepend: string, append: string) => void;
  setForm: React.Dispatch<React.SetStateAction<FormData | null>>;
  afterUploadCkb?: (v:  any) => void;
}

const UploadFile: FC<UploadFileProps> = ({ uploadProps, afterUploadCkb, editHandler, setForm}) => {

  const { url, headers, multiple, type, noAutoInsert, otherParams } = uploadProps

  const antUploadProps = {
    name: 'file',
    action: url|| '',
    headers: headers || {},
    multiple: multiple || false,
    customRequest(files: UploadRequestOption) {
      const newFile = files.file;

      afterUploadCkb && afterUploadCkb(newFile);

      const formData: FormData = new FormData();
      formData.append('file', newFile, files.filename + '_' + new Date().getTime());
      // formData.append('file', newFile, newFile.name);

      if (otherParams) {
        const sourceParams: ObjectEnum = otherParams;
        Object.keys(sourceParams).map(v => {
          formData.append(v, sourceParams[v]);
          return v;
        });
      }

      setForm(formData);
    },
  };

  return (
    <div className="uploadBox">
      <Upload {...antUploadProps}>
        <a href='#' style={{display: 'flex', alignItems: 'center'}}>
          <FileImageOutlined />&nbsp;<span>文件上传</span>
        </a>
      </Upload>
    </div>
  );
};

export default React.memo(UploadFile);
