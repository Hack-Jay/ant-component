import React from "react";
import Icon from "../icon";
import Progress from "../progress/progress";
import { UploadFile } from "./upload";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="ant-upload-list">
      {fileList.map((item) => {
        return (
          <li className="ant-upload-list-item" key={item.uuid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>

            <span className="file-status">
              {(item.status === "uploading" || item.status === "ready") && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === "success" && (
                <Icon icon="check-circle" theme="success" />
              )}
              {item.status === "error" && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>

            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>

            {item.status === "uploading" && (
              <Progress precents={item.percent || 0} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
