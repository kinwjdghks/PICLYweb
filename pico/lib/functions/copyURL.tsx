const address = {
    local: "localhost:3000/Album/",
    app: "pico.net.co/Album/",
  };
  const domain = (string: "local" | "app") => address[string];

  export const copyURL = async (albumID:string) => {
    try {
      await navigator.clipboard.writeText(`${domain("app")}${albumID}`);
      console.log("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      console.log("복사에 실패하였습니다");
    }
  };