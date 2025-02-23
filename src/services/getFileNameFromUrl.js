export default function extractFilenameFromUrl(url) {
  // Split the URL by '/' to get an array of segments
  const segments = url.split("/");

  // Get the last segment (which contains the filename)
  const filename = segments.pop();

  return filename;
}
