export default function Videos() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">AI Advisory Videos</h1>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="YouTube video"
        allowFullScreen
      ></iframe>
    </div>
  );
}