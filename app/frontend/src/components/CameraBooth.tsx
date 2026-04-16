"use client";

import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { createAssessment } from "@/actions/assessmentActions";
import { useRouter } from "next/navigation";
import { Camera, ShieldCheck, Loader2 } from "lucide-react";

export default function CameraBooth() {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleUploadComplete = async (res: any) => {
    if (res && res.length > 0) {
      setIsProcessing(true);
      const url = res[0].url;
      const result = await createAssessment(url);
      
      if (result.success) {
        // Use timeout to show success for a bit before routing
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        alert("Failed to process assessment. Please try again.");
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-6 shadow-apple relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-[#007aff] dark:text-[#0a84ff]">
            <Camera className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white tracking-tight mb-2">Camera Booth</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-[250px]">
            Securely upload a photo and it will automatically be analyzed and saved to your profile.
          </p>

          {isProcessing ? (
            <div className="w-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-[#252528] rounded-2xl border border-gray-100 dark:border-gray-800">
              <Loader2 className="w-8 h-8 animate-spin text-[#007aff] dark:text-[#0a84ff] mb-4" />
              <p className="text-sm font-medium text-black dark:text-white">Processing Image...</p>
              <p className="text-xs text-gray-400 mt-1">Encrypting & saving to database</p>
            </div>
          ) : (
            <div className="w-full border border-gray-100 dark:border-[#2a2a2c] rounded-2xl p-2 bg-gray-50/50 dark:bg-[#252528]/50">
              <UploadDropzone
                endpoint="woundImageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
                appearance={{
                  container: "w-full border-2 border-dashed border-[#007aff]/30 dark:border-[#0a84ff]/30 bg-transparent flex flex-col items-center justify-center transition-colors hover:border-[#007aff] hover:bg-blue-50/50 dark:hover:bg-[#0a84ff]/10 rounded-xl cursor-pointer p-4 group",
                  label: "text-[#007aff] dark:text-[#0a84ff] group-hover:text-blue-700 dark:group-hover:text-blue-400 font-medium transition-colors",
                  allowedContent: "text-gray-400 text-xs mt-1",
                  button: "ut-uploading:cursor-not-allowed bg-[#007aff] dark:bg-[#0a84ff] text-white px-6 rounded-full font-medium after:bg-blue-600 shadow-apple text-sm mt-4 tracking-wide w-full"
                }}
                content={{
                  label: "Tap to Select Photo",
                  allowedContent: "JPEG, PNG, JPG under 4MB"
                }}
              />
            </div>
          )}

          <div className="mt-6 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500 font-medium">
            <ShieldCheck className="w-4 h-4 mr-1 text-green-500 opacity-80" />
            End-to-end encrypted transfer
          </div>
        </div>
      </div>
    </div>
  );
}
