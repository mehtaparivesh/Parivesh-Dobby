// importing modules
import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Compressor from "compressorjs";
import Notifi, { fire } from "./Notifi";

// importing utils
import { IMAGE_UPLOAD_URL } from "../config";
// to send http cookie with request
axios.defaults.withCredentials = true;
function Upload() {
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileurl, setFileUrl] = useState();
  const [progress, setProgress] = useState(0);
  const handleChange = (event) => {
    let file = event.target.files[0];
    console.log(file);
    setFile(file);
  };
  const handleOnClick = () => setFileUrl(null);

  const handleSubmit = async (e) => {
    if (!name || name.length < 3) {
      fire("error", "name should be at least 3 character long");
      return;
    }
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", name);
    axios
      .post(IMAGE_UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: ({ loaded, total, ...props }) => {
          console.log(props);
          setProgress((loaded * 100) / total);
        },
      })
      .then(
        (res) => {
          if (res.data.success === true) {
            setUploading(false);
            fire("success", "image Uploaded successfully");
            setFileUrl(null);
          } else {
            setUploading(false);
            fire("error", res.data.message);
            setFileUrl(null);
          }
        },
        (err) => {
          setUploading(false);
          fire("error", "Unknown error");
          setFileUrl(null);
        }
      );
  };
  useEffect(() => {
    if (!file) return;
    new Compressor(file, {
      quality: 1,
      success: (res) => {
        setFileUrl(URL.createObjectURL(res));
      },
    });
  }, [file]);

  const Progress = ({ progress }) => (
    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        class="bg-blue-600 h-2.5 rounded-full"
        style={{ width: progress + "%" }}
      ></div>
    </div>
  );
  return (
    <section className="p-4 border-2 border-gray-200 max-w-[1300px] w-full">
      <Notifi />
      {fileurl && (
        <motion.div
          className="fixed flex items-center justify-center w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.7)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ zIndex: 10 }}
        >
          <div className="w-[600px] h-[400px] flex flex-col items-center justify-center space-y-5">
            <img
              className="h-[300px] w-[300px] object-contain"
              src={fileurl.toString()}
              style={{ borderRadius: "10px", cursor: "pointer" }}
            />
            {!uploading ? (
              <button
                type="button"
                className="md:mt-4 py-2  w-[300px] bg-blue-400 md:h-[45px] h-[40px] text-white font-bold hover:opacity-85 opacity-90"
                onClick={handleSubmit}
              >
                Upload
              </button>
            ) : (
              <Progress type="line" percent={progress} width={50} />
            )}
            <button
              type="button"
              className="md:mt-4 py-2 w-[300px] bg-red-500 md:h-[45px] h-[30px] text-white font-bold hover:opacity-85 opacity-90"
              onClick={handleOnClick}
            >
              exit
            </button>
          </div>
        </motion.div>
      )}
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center  justify-center items-center flex-wrap  p-6">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100  w-full"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div class="my-6">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="name"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Upload);
