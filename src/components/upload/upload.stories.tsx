import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Upload, { UploadFile } from "./upload";
import Icon from "../icon";
import Button from "../button";

export default {
  title: "Example/Upload",
  component: Upload,
} as ComponentMeta<typeof Upload>;

const defaultFileList: UploadFile[] = [
  {
    uuid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  { uuid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uuid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("file too big");
    return false;
  }
  return true;
};

const Template1: ComponentStory<typeof Upload> = (args) => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    // onProgress={(precents, file) => console.log("on progress", precents, file)}
    // onSuccess={(data, file) => console.log("success", data, file)}
    // onError={(error, file) => console.log("error", error, file)}
    // beforeUpload={checkFileSize}
    // onChange={file => console.log("change", file)}
    // defaultFileList={defaultFileList}
    name="fileName"
    accept=".jpg"
    multiple
    withCredentials
  >
    <Button btnType="primary">点击上传</Button>
  </Upload>
);

export const DefaultUpload = Template1.bind({});
DefaultUpload.storyName = "upload";

const Template: ComponentStory<typeof Upload> = (args) => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    // onProgress={(precents, file) => console.log("on progress", precents, file)}
    // onSuccess={(data, file) => console.log("success", data, file)}
    // onError={(error, file) => console.log("error", error, file)}
    // beforeUpload={checkFileSize}
    // onChange={file => console.log("change", file)}
    // defaultFileList={defaultFileList}
    name="fileName"
    accept=".jpg"
    multiple
    withCredentials
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
  </Upload>
);

export const DragUpload = Template.bind({});
DragUpload.storyName = "drag upload";
