import { FaHashtag } from "react-icons/fa6";
import { TagBlock } from "../container/Blocks";
import { MAX_TAG_NUM } from "../modal/NewAlbumModal";
import { Dispatch, ReactNode, RefObject, SetStateAction, useEffect } from "react";
import { InputLabel } from "../container/InputLabel";
import { Error } from "../modal/ErrorModal";

type TagListProps = {
  scrollTagRef: RefObject<HTMLDivElement>;
  tagList: string[];
  inputTagRef: RefObject<HTMLInputElement>;
  setTagList:Dispatch<SetStateAction<string[]>>
  setErrorNo:Dispatch<SetStateAction<Error>>
};

const TagInput = ({
  scrollTagRef,
  tagList,
  inputTagRef,
  setTagList,
  setErrorNo
}: TagListProps): ReactNode => {

  useEffect(() => {
    tagAutoscroll();
  }, [tagList.length]);

  const tagAutoscroll = () => {
    //autoscroll to very left when list updated.
    const scrollContainer = scrollTagRef.current;
    if (scrollContainer) {
      const maxScrollLeft =
        scrollContainer.scrollWidth + scrollContainer.clientWidth;
      //console.log(maxScrollLeft)
      scrollContainer.scrollTo(maxScrollLeft, 0);
    }
  };

  const addTag = () => {
    if (!inputTagRef.current) return;
    const newtag = inputTagRef.current.value.trim();
    if (newtag == "") return;

    if (tagList.length == MAX_TAG_NUM) {
      setErrorNo('MAX_TAG');
      return;
    }
    const res = tagList.find((tag) => tag == newtag);
    if (res) {
      setErrorNo('DUP_TAG');
      return;
    }
    const newTagList = [...tagList, newtag];
    setTagList(newTagList);
    inputTagRef.current.value = "";
    return;
  };

  const deleteTag = (target: string) => {
    console.log("deleteTag");
    const newTagList: string[] = tagList.filter((tag) => tag != target);
    setTagList(newTagList);
  };

  return (
    <>
      <InputLabel>태그</InputLabel>
      <div className="(tag list) w-full h-[4.5rem] flex overflow-x-scroll scrollbar-hide"
        ref={scrollTagRef}>
        <div className="min-w-max w-min h-full flex items-center">
          {tagList.map((tag) => (
            <TagBlock key={tag} tag={tag} deleteTag={deleteTag} />
          ))}
        </div>
      </div>
      <div className="(tag input) w-full h-min flex items-center box-border place-self-end">
        <span className="absolute w-max mr-3 text-black text-3xl text-center">
          <FaHashtag className="w-6 h-6 mx-2 fill-black" />
        </span>
        <input className={`disabled:opacity-70 lg:border-2 w-full p-2 pl-9 rounded-md text-black text-xl outline-none`}
          type="text"
          ref={inputTagRef}
          onKeyDown={(e) => {
            if (
              (e.key == "Enter" || e.keyCode == 13) &&
              !e.nativeEvent.isComposing
            ) {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="태그를 입력하세요"
        />
      </div>
    </>
  );
};

export default TagInput;
