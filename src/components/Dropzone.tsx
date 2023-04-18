import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import { uploadUserImage } from "../api";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 24;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Dropzone: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleFileUpload = async (file: File) => {
    try {
      const form = new FormData();
      form.append("files", file);
      const response = await uploadUserImage(form);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = ({
    file,
    fileList,
  }: {
    file: RcFile;
    fileList: RcFile[];
  }): void => {
    handleFileUpload(file);

    // UploadProps["onChange"] = (
    //   info: UploadChangeParam<UploadFile>
    // ) => {
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   getBase64(info.file.originFileObj as RcFile, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      showUploadList={false}
      action="/upload"
      maxCount={1}
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      // beforeUpload={beforeUpload}
      // onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default Dropzone;
