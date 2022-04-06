import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

import { CreateEventParams, useEventManagerContract } from "../../hooks/useEventManagerContract";

import "antd/dist/antd.css";

const EventsPage = () => {
  const { createEvent } = useEventManagerContract();
  const [eventForm, setEventForm] = useState<CreateEventParams>({
    eventName: "",
    eventDescription: "",
    price: 0,
    tokenSymbol: "CAR",
    totalSupply: 0,
    coverURI: "https://cdn.lorem.space/images/movie/.cache/500x0/godzilla-kong.jpg",
  });

  const [eventAddress, setEventAddress] = useState("");
  const [isIpfsUploadSuccess, setIsIpfsUploadSuccess] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const router = useRouter();

  const isValid = useMemo(() => {
    return (
      eventForm.eventName.length > 0 &&
      eventForm.eventDescription.length > 0 &&
      eventForm.price > 0 &&
      eventForm.tokenSymbol.length > 0 &&
      eventForm.totalSupply > 0 &&
      isIpfsUploadSuccess
    );
  }, [eventForm]);

  const convertIpfsToHttp = (ipfsUrl: string) => {
    if (ipfsUrl.indexOf("ipfs://") === 0) {
      return ipfsUrl.replace(/ipfs:\/\//i, "https://ipfs.io/ipfs/");
    }
    throw new Error("Invalid IPFS URL");
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must smaller than 10MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = ({ fileList: files }) => {
    setFileList(files);
  };

  const customRequest = async (option) => {
    const { onProgress, onError, onSuccess, action, file } = option;
    const url = action;
    const formData = new FormData();

    // Uploaded Video
    if (fileList.length >= 2) {
      formData.append("videoFile", fileList[0].originFileObj);
    }

    formData.append("imageFile", file);

    try {
      const response = await axios.post(url, formData, {
        onUploadProgress: (e) => {
          onProgress({ percent: (e.loaded / e.total) * 100 });
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === 200) {
        const ipfsUrl = convertIpfsToHttp(response.data.ipfsUrl);
        const media: any = await axios.get(ipfsUrl);
        const imageUrl = convertIpfsToHttp(media.data.image);
        setEventForm({
          ...eventForm,
          coverURI: imageUrl,
        });
        setIsIpfsUploadSuccess(true);
        onSuccess(response);
      }
    } catch (e) {
      setIsIpfsUploadSuccess(false);
      onError(e);
      message.error("Upload image failed");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="text-white">
      {eventAddress && (
        <div className="shadow-lg alert alert-success">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Event has been created!</span>
            <Link href={`/events/${eventAddress}`}>
              <button type="button">Check Detail</button>
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center w-full mt-10 space-y-10">
        <div className="form-control">
          <label className="text-white label">
            <span className="text-white label-text">Event Name</span>
          </label>
          <label className="input-group">
            <input
              value={eventForm.eventName}
              onChange={(e) => {
                setEventForm({ ...eventForm, eventName: e.target.value });
              }}
              type="text"
              placeholder="Some Awesome Event"
              className="text-black input input-bordered w-[300px]"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="text-white label">
            <span className="text-white label-text">Event Description</span>
          </label>
          <label className="input-group">
            <input
              value={eventForm.eventDescription}
              onChange={(e) => {
                setEventForm({ ...eventForm, eventDescription: e.target.value });
              }}
              type="text"
              placeholder="Some Awesome Event Description "
              className="text-black input input-bordered w-[300px]"
            />
          </label>
        </div>
        <Upload
          action="https://crypto.org/ipfs-middleware-server/uploads"
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={customRequest}
          accept="image/jpg,image/jpeg,image/png"
          className="text-center w-[300px]"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <div className="form-control">
          <label className="text-white label">
            <span className="text-white label-text">Price(CRO)</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              placeholder="100"
              value={eventForm.price}
              onChange={(e) => {
                setEventForm({ ...eventForm, price: Number(e.target.value) });
              }}
              className="text-black input input-bordered w-[300px]"
            />
          </label>
        </div>

        <div className="form-control">
          <label className="text-white label">
            <span className="text-white label-text">Total Count</span>
          </label>
          <label className="input-group">
            <input
              type="number"
              placeholder="100"
              value={eventForm.totalSupply}
              onChange={(e) => {
                setEventForm({ ...eventForm, totalSupply: Number(e.target.value) });
              }}
              className="text-black input input-bordered w-[300px]"
            />
          </label>
        </div>

        <div className="flex">
          {isValid ? (
            <button
              className="align-bottom bg-white btn text-primary hover:bg-secondary hover:text-white"
              onClick={() => {
                createEvent({ ...eventForm }).then((hash) => {
                  setEventAddress(hash);
                });
              }}
            >
              Create Event
            </button>
          ) : (
            <button className="align-bottom bg-white btn-disabled btn text-primary hover:bg-secondary hover:text-white">
              Create Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
