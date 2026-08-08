export class SpeechTranscriber {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = "en-US";
      }
    }
  }

  public start(
    onResult: (transcript: string) => void,
    onError?: (error: any) => void
  ) {
    if (!this.recognition) {
      if (onError) onError("Speech Recognition is not supported in this browser.");
      return;
    }

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      onResult(currentTranscript);
    };

    this.recognition.onerror = (event: any) => {
      if (onError) onError(event.error);
    };

    this.recognition.start();
  }

  public stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}