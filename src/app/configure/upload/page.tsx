"use client";

import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { ImagePlus, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";




const Upload = () => {
  const [isDraggedOVer, setIsDraggedOver] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      })
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
  });

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDraggedOver(false);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDraggedOver(false);
    toast({
      title: `${file.file.name} is not a valid image`,
      description: "Only JPG, PNG and JPEG images are allowed",
      variant: "destructive",
    })
  };
 
  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex flex-col justify-center items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDraggedOVer,
        }
      )}>
      <div className="flex flex-col flex-1 items-center justify-center w-full">
        <Dropzone 
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          onDragEnter={() => setIsDraggedOver(true)}
          onDragLeave={() => setIsDraggedOver(false)}
          accept={{ "image/*": [".jpeg", ".jpg", ".png"] }}>
          {({ getRootProps, getInputProps }) => (
            <div className="size-full flex flex-col items-center justify-center" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDraggedOVer ? (
                <MousePointerSquareDashed className="size-6 to-zinc-600 mb-2" />
              ) : isUploading || isPending ? (
                <Loader2 className="size-7 animate-spin text-zinc-500 mb-2" />
              ) : (
                <ImagePlus className="size-7 mb-2 text-zinc-500 cursor-copy hover:size-8 hover:text-blue-700" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading</p>
                    <Progress value={uploadProgress} className="mt-2 w-40 h-2 bg-gray-300" />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDraggedOVer ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold ">Click to browse</span> or drag and drop
                  </p>
                )}
              </div>
              {!isPending && <p className="text-xs text-zinc-500">PNG, JPG, JPEG up to 4MB</p>}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default Upload;
