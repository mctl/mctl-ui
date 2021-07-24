import React, { FC } from 'react';
import { Upload } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import type { UploadEnum, tagType } from './typing'
import type { HttpType, ObjectEnum } from '../../typing'
import type { UploadRequestOption } from 'rc-upload/lib/interface'

interface UploadFileProps{
  uploadProps: UploadEnum;
  afterUploadCkb?: (v:  any) => void;
  editHandler: (tag: tagType, prepend: string, append: string) => void;
}

const UploadFile: FC<UploadFileProps> = ({ uploadProps, afterUploadCkb, editHandler}) => {

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
      formData.append('file', newFile, files.filename);
      // formData.append('file', newFile, newFile.name);

      if (otherParams) {
        const sourceParams: ObjectEnum = otherParams;
        Object.keys(sourceParams).map(v => {
          formData.append(v, sourceParams[v]);
          return v;
        });
      }

      const httpType: HttpType = type || 'post';
      const httpUrl: string = url || '';

      //todo
      // Http[httpType](httpUrl, formData).then((res: any) => {
      //   // console.log('上传返回res',res)
      //   afterUploadCkb && afterUploadCkb(res);
      //   if (res && res.markdown && !noAutoInsert) {
      //     editHandler('file', '', res.markdown);
      //   }
      // });
    },
  };

  return (
    <div className="uploadBox">
      <Upload {...antUploadProps}>
        <a>
          <FileImageOutlined /> Attach a file
        </a>
      </Upload>
    </div>
  );
};

export default React.memo(UploadFile);
