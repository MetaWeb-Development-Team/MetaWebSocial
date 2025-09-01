import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function CreateFiles() {
  // required fields for adding to db
  const [filename, setFilename] = useState<string>("");
  const [filedata, setFileData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSaveFile = () => {
    const data = {
      filename,
      filedata,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/files", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err: unknown) => {
        setLoading(false);
        alert("An Error Occurred. Please Check Console");
        console.log(err);
      });
  };

  const handleFilenameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilename(e.target.value);
  const handleFileDataChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFileData(e.target.value);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create File</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Filename</label>
          <input
            type="text"
            value={filename}
            onChange={handleFilenameChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-600">Data</label>
          <input
            type="text"
            value={filedata}
            onChange={handleFileDataChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveFile}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateFiles;
