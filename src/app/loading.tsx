import { GooeyLoader } from "@/components/ui/loader-10"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Gooey Loader */}
        <div className="mb-8">
          <GooeyLoader
            primaryColor="#3b82f6" // Primary blue color
            secondaryColor="#93c5fd" // Light blue color
            borderColor="#e5e7eb" // Gray border
            className="mx-auto"
          />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Memuat Halaman...
        </h2>
        <p className="text-gray-500">
          Mohon tunggu sebentar
        </p>
      </div>
    </div>
  )
}