import AlbumComponent from "./AlbumComponent";
import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import { Album } from "@/templates/Album";
import ReactDOM from "react-dom";
import PopupMessage from "../modal/PopupMessage";
import AlertMessage from "../modal/AlertMessage";
import styles from '@/styles/pullToRefresh.module.css';
import { HEADER_HEIGHT } from "./GalleryHeader";

const CopiedAlert = ({
  showCopyMsg,
  setShowCopyMsg,
}: {
  showCopyMsg: boolean;
  setShowCopyMsg: Dispatch<SetStateAction<boolean>>;
}) => {
  if (typeof window === "undefined") return null;
  const root = document.getElementById("alertroot");
  const portal = ReactDOM.createPortal(
    <PopupMessage className="fixed top-16 left-1/2 -translate-x-1/2"
      show={showCopyMsg}
      setShow={setShowCopyMsg}
      ellapseTime={1200} >
      <AlertMessage >링크가 복사되었습니다.</AlertMessage>
    </PopupMessage>,
    root!
  );
  return portal;
};

const NoResult = () => {
  return (
    <div className="col-span-2">
      <p className="text-white text-center text-[2rem] mt-40">
        앨범이 없습니다
      </p>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="col-span-2">
      <p className="text-white text-center text-[2rem] mt-40">
        앨범을 가져오는 중입니다..
      </p>
    </div>
  );
};

const AlbumsContainer = ({userAlbumList,tagInput,selectAlbum} : {userAlbumList: Album[] | undefined, tagInput:string, selectAlbum:(album: Album) => void}) => {
  // Variables
  const SWIPE_THERSHOLD = 60;

  //useStates
  const [filteredAlbumList, setFilteredAlbumList] = useState<Album[] | undefined>(userAlbumList);
  const [showCopyMsg, setShowCopyMsg] = useState<boolean>(false);
  
  //useRefs
  const timer = useRef<NodeJS.Timeout | null>(null);
  const loadingContainerRef = useRef<HTMLDivElement>(null);
  const swipeContainerRef =useRef<HTMLDivElement>(null);
  const isRefreshLoading = useRef<boolean>(false);
  const touchStartY = useRef<number>(0);
  const loadingHeight = useRef<number>(0);
  
  // useEffects
  useEffect(() => {
    // console.log(userAlbumList);
    if (userAlbumList === undefined) return;
    setFilteredAlbumList(userAlbumList);
  }, [userAlbumList]);

  useEffect(() => {
    console.log(filteredAlbumList);
    console.log(userAlbumList);
  }, [filteredAlbumList]);

  useEffect(() => {
    if (timer.current != null) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      filterByTag(tagInput);
    }, 500);
  }, [tagInput]);

  useEffect(()=>{
    if(loadingContainerRef && swipeContainerRef){
      loadingContainerRef.current?.addEventListener('touchstart',(e)=>swipeStart(e));
      loadingContainerRef.current?.addEventListener('touchmove',(e)=>swipe(e));
      loadingContainerRef.current?.addEventListener('touchend',(e)=>swipeEnd(e));
    }

    return ()=>{
      loadingContainerRef.current?.removeEventListener('touchstart',(e)=>swipeStart(e));
      loadingContainerRef.current?.removeEventListener('touchmove',(e)=>swipe(e));
      loadingContainerRef.current?.removeEventListener('touchend',(e)=>swipeEnd(e));
    }
  },[]);
  
  // functions
  const filterByTag = (tagInput: string) => {
    if (tagInput.trim() === "" && userAlbumList) {
      setFilteredAlbumList(userAlbumList);
      return;
    }
    if (userAlbumList) {
      const newList = userAlbumList.filter((album) =>
        album.tags.some((tag) => tag.includes(tagInput))
      );
      setFilteredAlbumList(newList);
    }
  };

  const handleRefresh = () =>{
    alert('refresh');
  }

  const swipeStart = (e:TouchEvent) =>{
    if(!isRefreshLoading && swipeContainerRef.current){
      if(swipeContainerRef.current.scrollTop != 0) return;
      touchStartY.current = e.targetTouches[0].screenY;
    }
  }
  
  const swipe = (e:TouchEvent) =>{
    if(!isRefreshLoading && loadingContainerRef.current){
      screenY = e.changedTouches[0].screenY;
      let changeY = screenY > touchStartY.current ? Math.abs(screenY-touchStartY.current) : 0;
      if(changeY >= 0){
        loadingContainerRef.current.style.height = `${changeY}px`;
        loadingHeight.current = changeY;
      }
    }
  }
  
  const swipeEnd = (e:TouchEvent) =>{
    if(!isRefreshLoading && loadingContainerRef.current && loadingHeight.current >= SWIPE_THERSHOLD){
        handleRefresh();
    }
  }

  return (
    <>
      <CopiedAlert showCopyMsg={showCopyMsg} setShowCopyMsg={setShowCopyMsg} />
      <div className={`absolute lg:top-20 top-16 left-0 w-full bg-red-500`}
        ref={swipeContainerRef}></div>
      <div className={`${styles.container} lg:px-[15%] lg:pt-20 pb-10 lg:gap-4 w-full h-min pt-16 relative grid grid-cols-2 auto-rows-auto`}
        ref={loadingContainerRef}>
        {!filteredAlbumList ? (
          <Loading />
        ) : (
          <>
            {filteredAlbumList.length === 0 && <NoResult />}
            {filteredAlbumList.length > 0 &&
              filteredAlbumList.map((item, idx) => (
                <AlbumComponent
                  key={idx}
                  item={item}
                  priority={idx < 4 && true}
                  selectAlbum={selectAlbum}
                  alertCopyMsg={() => {
                    setShowCopyMsg(true);
                  }}/>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default AlbumsContainer;
