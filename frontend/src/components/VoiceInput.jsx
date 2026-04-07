export default function VoiceInput({ setText }) {
  const handleVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = (e) => {
      setText(e.results[0][0].transcript);
    };
  };

  return (
    <button
      onClick={handleVoice}
      className="bg-blue-500 text-white px-4 py-2"
    >
      🎤 Speak
    </button>
  );
}