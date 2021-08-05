import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Upload, { UploadFile } from "./upload";

export default {
  title: "Example/Upload",
  component: Upload,
} as ComponentMeta<typeof Upload>;

const defaultFileList: UploadFile[] = [
  { uuid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uuid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uuid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("file too big");
    return false;
  }
  return true;
};

const Template: ComponentStory<typeof Upload> = (args) => (
  <Upload
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    // onProgress={(precents, file) => console.log("on progress", precents, file)}
    // onSuccess={(data, file) => console.log("success", data, file)}
    // onError={(error, file) => console.log("error", error, file)}
    // beforeUpload={checkFileSize}
    // onChange={file => console.log("change", file)}
    defaultFileList={defaultFileList}
  />
);

export const DefaultUpload = Template.bind({});
DefaultUpload.storyName = "upload";
