import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: "df1fvofl6",
  api_key: 597851322794747,
  api_secret: "5U58_HXOgVIRD09i4Fma4vQ2iEs",
});



export async function POST(request: Request) {
  const { path } = await request.json();

  if (!path) {
    return NextResponse.json({ message: "Image path is required" }, { status: 400 });
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: "scale" }],
    };

    const result = await cloudinary.uploader.upload(path, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to upload image on Cloudinary" }, { status: 500 });
  }
}
