import { Dispatch, ReactNode, RefObject, SetStateAction, useEffect, useRef } from "react";
import { MAX_IMAGE_NUM } from "../modal/NewAlbumModal";
import { EmptyBlock, ImageBlock } from "../container/Blocks";
import { InputLabel } from "../container/InputLabel";

type ImageInputProps = {
  imgFiles: File[];
  setImgFiles: Dispatch<SetStateAction<File[]>>;
  setErrorNo: Dispatch<SetStateAction<number>>;
};

const ImageInput = ({
  imgFiles,
  setImgFiles,
  setErrorNo,
}: ImageInputProps): ReactNode => {
  const scrollImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    imgAutoscroll();
  }, [imgFiles.length]);

  const imgAutoscroll = () => {
    const scrollContainer = scrollImgRef.current;
    if (scrollContainer) {
      const maxScrollLeft =
        scrollContainer.scrollWidth + scrollContainer.clientWidth;
      //   console.log(maxScrollLeft)
      scrollContainer.scrollTo(maxScrollLeft, 0);
    }
  };

  const updateImage = (fileList: FileList | null) => {
    if (imgFiles && fileList) {
      //img overflow check
      if (MAX_IMAGE_NUM < imgFiles.length + fileList.length) {
        setErrorNo(3);
        return;
      }
      //dupliction check
      const newFileList = Array.from(fileList) || null;
      for (const file of newFileList) {
        for (let i = 0; i < imgFiles.length; i++) {
          console.log(file.name + "   " + imgFiles[i].name);
          if (file.name == imgFiles[i].name) {
            setErrorNo(4); //duplicate imgs
            return;
          }
        }
      }
      const updatedFileList = [...imgFiles, ...newFileList];
      setImgFiles(updatedFileList);
      console.log("file updated");
    }
  };

  const deleteImage = (filename: string) => {
    if (!imgFiles) return;
    const updatedFileList = imgFiles.filter((img) => img.name != filename);
    setImgFiles(updatedFileList);
  };
  return (
    <>
      <InputLabel>사진</InputLabel>
      <div
        className="(image list) w-full h-full flex-auto lg:mt-0 mt-[20px] bg-pico_darker rounded-2xl relative overflow-x-scroll scrollbar-hide basis-0"
        ref={scrollImgRef}
      >
        <div className="min-w-full w-max h-full flex items-center gap-4 p-4">
          {imgFiles!.map((img: File) => (
            <ImageBlock key={img.name} file={img} ondelete={deleteImage} />
          ))}
          <EmptyBlock updateImage={updateImage} />
        </div>
      </div>
    </>
  );
};


export default ImageInput;