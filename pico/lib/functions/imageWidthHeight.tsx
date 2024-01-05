import { imageSize } from "@/templates/Album";

// export const getImagetWidthandHeight = (file: File):imageSize => {
//     console.log(file);
//     const reader = new FileReader();
//     reader.readAsDataURL(file); 
    
//     reader.onload = function(e) {
//         const img = new Image();
//         img.src = (e.target as FileReader).result as string;

//         img.onload = function() {
//             // Directly use img.width and img.height
//             const width = img.width;
//             const height = img.height;
//             return {width:width, height:height};
//         };
//     };
//     return {width:0,height:0};
// };

export const getImagetWidthandHeight = (file:File):imageSize =>{
    const img = new Image();
    img.src = URL.createObjectURL(file);
    return {width:img.width,height:img.height}
}