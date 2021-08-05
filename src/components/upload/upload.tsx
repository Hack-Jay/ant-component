import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import Button from "../button";
import UploadList from "./uploadList";

type UploadStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  uuid: string;
  name: string;
  size: number;
  status: UploadStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (precents: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const uploadRef = useRef<HTMLInputElement>(null);

  console.log("fileList:", fileList);

  const updateFileList = (
    uploadFile: UploadFile,
    uploadObj: Partial<UploadFile>
  ) => {
    setFileList((preList) => {
      return preList.map((file) => {
        if (file.uuid === uploadFile.uuid) {
          return {
            ...file,
            ...uploadObj,
          };
        } else return file;
      });
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);

    uploadRef.current && (uploadRef.current.value = "");
  };

  const uploadFiles = (files: FileList) => {
    let postFile = Array.from(files);
    postFile.forEach((file) => {
      if (beforeUpload) {
        const result = beforeUpload(file);
        if (result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      } else {
        post(file);
      }
    });
  };

  const post = (file: File) => {
    let _file: UploadFile = {
      uuid: Date.now() + "upload-file",
      name: file.name,
      size: file.size,
      raw: file,
      status: "ready",
      percent: 0,
    };
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          updateFileList(_file, {
            status: "uploading",
            percent: percentage,
          });
          onProgress && onProgress(percentage, file);
        },
      })
      .then((resp) => {
        onSuccess && onSuccess(resp.data, file);
        updateFileList(_file, {
          status: "success",
          percent: 100,
          response: resp.data,
        });
        onChange && onChange(file);
      })
      .catch((error) => {
        onError && onError(error, file);
        updateFileList(_file, {
          status: "error",
          error,
        });
        onChange && onChange(file);
      });
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((preList) => {
      return preList.filter((item) => item.uuid !== file.uuid);
    });
  };

  const handleClick = () => {
    uploadRef.current && uploadRef.current.click();
  };

  return (
    <div className="ant-upload-component">
      <div className="ant-upload-input">
        <Button onClick={handleClick}>点击上传</Button>
        <input
          type="file"
          className="ant-file-input"
          style={{ display: "none" }}
          ref={uploadRef}
          onChange={handleFileChange}
        />

        <UploadList fileList={fileList} onRemove={handleRemove} />
      </div>
    </div>
  );
};

export default Upload;
