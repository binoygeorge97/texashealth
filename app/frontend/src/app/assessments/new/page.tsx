import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CameraBooth from "@/components/CameraBooth";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NewAssessmentPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#f2f2f7] dark:bg-black">
      <main className="w-full max-w-md bg-[#f2f2f7] dark:bg-black min-h-screen shadow-2xl shadow-black/5 flex flex-col relative">
        <div className="flex flex-col h-full animate-in fade-in duration-500 pt-16 px-5 pb-8 min-h-screen">
          
          <div className="mb-6 flex items-center">
            <Link 
              href="/dashboard"
              className="text-[#007aff] dark:text-[#0a84ff] flex items-center -ml-2 p-2 hover:bg-[#007aff]/10 dark:hover:bg-[#0a84ff]/20 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 mr-1" />
              <span className="font-semibold text-[17px]">Back</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white tracking-tight leading-tight">
              New Capture
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">
              Add a new assessment to your history.
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center w-full mb-[10vh]">
            <CameraBooth />
          </div>

        </div>
      </main>
    </div>
  );
}
