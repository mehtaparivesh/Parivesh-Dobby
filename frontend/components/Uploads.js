import React, { memo, Suspense, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ImageCard from "./ImageCard";
import { v4 as uuidv4 } from "uuid";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
function Uploads() {
  console.log("Uploads");
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const getImages = async (s = "") => {
    setLoading(true);
    const url =
      "http://localhost:8000/image/list" +
      (searchValue && searchValue != "" ? "?searchParam=" + searchValue : "");
    await axios.get(url).then(
      (response) => {
        console.log(response.data);
        if (response.data.success === true) {
          setImages(response.data.images);
        } else {
          // alert(response.data.message);
        }
        setTimeout(() => {
          setLoading(false);
        }, 200);
      },
      (err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }
    );
  };
  useEffect(() => {
    getImages();
  }, [searchValue]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-[1300px] min-h-[100vh]">
          <h1 className="text-2xl w-full p-4 text-center">
            {images.length
              ? `Found ${images.length} image` + (images.length > 1 ? "s" : "")
              : "No images found"}
          </h1>
          <div className="flex w-full">
            <SearchBar setSearchQuery={setSearchValue} />
          </div>
          <motion.div
            layout
            className="images flex flex-wrap justify-evenly w-full p-5  gap-4 min-h-[screen]"
          >
            <div className="flex flex-col lg:flex-[23%] flex-[48%] gap-4">
              {images.slice(0, images.length / 4).map((image, index) => {
                return (
                  <ImageCard
                    source={image.data}
                    key={uuidv4()}
                    name={image.name}
                    createdAt={new Date(image.createdAt).toDateString()}
                  />
                );
              })}
            </div>
            <div className="flex flex-col lg:flex-[23%] flex-[48%] gap-4">
              {images
                .slice(images.length / 4, images.length / 2)
                .map((image, index) => {
                  return (
                    <ImageCard
                      source={image.data}
                      key={uuidv4()}
                      name={image.name}
                      createdAt={new Date(image.createdAt).toDateString()}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col lg:flex-[23%] flex-[48%] gap-4">
              {images
                .slice(images.length / 2, (images.length * 3) / 4)
                .map((image, index) => {
                  return (
                    <ImageCard
                      source={image.data}
                      key={uuidv4()}
                      name={image.name}
                      createdAt={new Date(image.createdAt).toDateString()}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col lg:flex-[23%] flex-[48%] gap-4">
              {images.slice((images.length * 3) / 4).map((image, index) => {
                return (
                  <ImageCard
                    source={image.data}
                    key={uuidv4()}
                    name={image.name}
                    createdAt={new Date(image.createdAt).toDateString()}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default memo(Uploads);
