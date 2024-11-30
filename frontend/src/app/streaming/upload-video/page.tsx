'use client'

import Drag_input_field from "@/components/image_compress/Drag_input_field"
import React, { useCallback, useState } from "react"

interface UploadProgress {
  [filename: string]: number
}

export default function Page() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const url = "https://api.vidguard.to/v1/upload/server?key=jJYOdq8a5e9o";
  
    acceptedFiles.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
  
      // Create a function to simulate progress tracking
      const uploadWithProgress = async (formData: FormData) => {
        const totalBytes = file.size;
        let loadedBytes = 0;
  
        // Get the file from FormData
        const fileEntry = formData.get('file');
  
        // Check if the fileEntry is not null
        if (fileEntry && fileEntry instanceof File) {
          const reader = fileEntry.stream().getReader();
  
          // Create a ReadableStream to track progress
          const stream = new ReadableStream({
            start(controller) {
              const pump = () => reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                loadedBytes += value.byteLength;
                const percentComplete = Math.round((loadedBytes / totalBytes) * 100);
                setUploadProgress(prev => ({
                  ...prev,
                  [file.name]: percentComplete
                }));
                controller.enqueue(value);
                pump();
              });
              pump();
            }
          });
  
          // Send the fetch request with the stream
          const response = await fetch(url, {
            method: 'POST',
            body: stream,
            headers: {
              // Set appropriate headers if needed
              'Accept': 'application/json'
            }
          });
  
          if (response.ok) {
            console.log("Upload successful!", file.name);
          } else {
            console.error("Upload failed!", file.name);
          }
        } else {
          console.error("No valid file found in FormData.");
        }
      };
  
      uploadWithProgress(formData);
    });
  }, []);
  
  
  return (
    <div className="container mx-auto p-4">
      <Drag_input_field onDrop={handleDrop} />
      {Object.entries(uploadProgress).map(([filename, progress]) => (
        <div key={filename} className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{filename}</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}