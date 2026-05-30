import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => {
      return { uploadedBy: "user" };
    })
    .onUploadComplete((data) => {
      console.log("Upload complete:", data);
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter 