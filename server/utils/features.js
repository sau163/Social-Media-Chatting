import { userSocketId } from "../app.js";
import cloudinary from "cloudinary";
import fs from "fs";


const emitEvent =  (req, event ,users,data)=>{
    console.log(event);
}

const deleteFilesFromCloud = async (public_ids)=>{
 console.log("jhfjhjh");
}



// export const getSockets =(users =[])=>{
//     console.log("users",users);
//     const sockets= users.map(user=>{
//         userSocketId.get(user.toString());
//     })
//     console.log("sockets",sockets);
//     return  sockets;
// };
export const getSockets = (users = []) => {
    console.log("users", users);
    const sockets = users.map(user => {
        return userSocketId.get(user.toString());
    });
    console.log("sockets", sockets);
    return sockets;
};
// const getBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };
// export const  uploadFileToCloud=async(file=[])=>{
//     const uploadPromise = file.map((file)=>{
//         return new Promise((resolve, reject)=>{
//             cloudinary.v2.uploader.upload(
//                 getBase64(file),
//                 {
//                     resource_type:"auto",
//                     public_id: Date.now().toString(),
                    
//                 },
//                 (error,result)=>{
//                     if(error){
//                       return  reject(error);
//                     }
//                     resolve(result);
//                 }
//             )
//         })
//     })
// }



// const getBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       if (!file || !file.path) {
//         return reject(new Error("File path is undefined."));
//       }
  
//       fs.readFile(file.path, (err, data) => {
//         if (err) {
//           return reject(err);
//         }
//         const base64 = `data:${file.mimetype};base64,${data.toString("base64")}`;
//         resolve(base64);
//       });
//     });
//   };

// const getBase64 = (file) => {
//     return new Promise((resolve) => {
//       const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
//       resolve(base64);
//     });
//   };



// const getBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     if (!file || !file.buffer) {
//       return reject(new Error("File buffer is undefined."));
//     }

//     const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
//     resolve(base64);
//   });
// };

  export const uploadFileToCloud = async (files = []) => {
    const uploadPromises = files.map(async (file) => {
      
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path,
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
      });
    });
  
    try{
        const result = await Promise.all(uploadPromises);
        console.log("saurabh",result);

        const formattedResult =result.map((result) => ({
           
                public_id: result.public_id,
                url: result.url
            
        }))
        return formattedResult;
    }catch(e){
        console.error(e);
        throw new Error("Failed to upload files to cloudinary");

    }
  };







export { deleteFilesFromCloud,emitEvent };