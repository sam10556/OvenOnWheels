"use client";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function UploadImage({onImageUpload}) {
  const [publicId, setPublicId] = useState("");
  return (
    <>
      {publicId && (
        <CldImage src={publicId} alt={publicId} width={"300"} height={"300"} />
      )}
      <CldUploadWidget
        uploadPreset="Pizza-Delivery-App"
        onSuccess={({ event, info }) => {
          if (event === "success") {
            const uploadedImage = info?.secure_url || ""; // Get the secure URL
            onImageUpload(uploadedImage);
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            className="bg-primary mt-2 text-white p-4 rounded-lg"
            onClick={() => open()}
          >
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
}
