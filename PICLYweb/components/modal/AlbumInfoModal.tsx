import {
  formatDateString,
  formatTimeString,
} from "@/lib/functions/dateFunctions";
import { Album } from "@/templates/Album";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

type AlbumInfoModalProps = {
  album: Album;
  closeModal: () => void;
};
const AlbumInfoModal = ({
  album,
  closeModal,
}: AlbumInfoModalProps): ReactNode => {
  return (
    <div className="fixed w-4/5 lg:w-1/4 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-picly_lighter rounded-xl flex flex-col items-center">
      <IoClose className="w-8 h-8 fixed right-2 top-3" onClick={closeModal} />
      <h1 className="text-2xl p-3">앨범 생성일</h1>
      <p>{formatDateString(album.creationTime)}</p>
      <h1 className="text-2xl p-3">앨범 만료일</h1>
      <p>
        {formatDateString(album.expireTime) +
          " " +
          formatTimeString(album.expireTime)}
      </p>
      <h1 className="text-2xl p-3">사진 수</h1>
      <p>{album.imageCount}</p>
      <h1 className="text-2xl p-3">조회수</h1>
      <p>{album.viewCount}</p>
    </div>
  );
};

export default AlbumInfoModal;
