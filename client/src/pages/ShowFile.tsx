import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { RouteParams } from "../interface/RouteParams";
import { FileData } from "../interface/FileData";

function ShowFile() {
   const [loadedFile, setFile] = useState<FileData | null>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const { id } = useParams() as RouteParams;

   useEffect(() => {
      setLoading(true);
      axios
         .get<FileData>(`http://localhost:5555/files/${id}`)
         .then((res) => {
            setFile(res.data);
            console.log(res.data);
            setLoading(false);
         })
         .catch((err: unknown) => {
            console.log(err);
            setLoading(false);
         });
   }, [id]);

   return (
      <div className="p-4">
         <BackButton />
         <h1 className="text-3xl my-4">Show File</h1>
         {loading ? (
            <Spinner />
         ) : (
            loadedFile && (
               <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                  <div className="my-4">
                     <span className="text-xl mr-4 text-gray-500">Id</span>
                     <span>{loadedFile._id}</span>
                  </div>
                  <div className="my-4">
                     <span className="text-xl mr-4 text-gray-500">
                        Filename
                     </span>
                     <span>{loadedFile.filename}</span>
                  </div>
                  <div className="my-4">
                     <span className="text-xl mr-4 text-gray-500">Data</span>
                     <span>{loadedFile.filedata}</span>
                  </div>
                  <div className="my-4">
                     <span className="text-xl mr-4 text-gray-500">
                        Create Time
                     </span>
                     <span>{new Date(loadedFile.createdAt).toString()}</span>
                  </div>
                  <div className="my-4">
                     <span className="text-xl mr-4 text-gray-500">
                        Last Update Time
                     </span>
                     <span>{new Date(loadedFile.updatedAt).toString()}</span>
                  </div>
               </div>
            )
         )}
      </div>
   );
}

export default ShowFile;
