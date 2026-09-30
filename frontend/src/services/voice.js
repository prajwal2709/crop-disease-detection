/**
 * Voice Service using Web Speech API
 * Provides text-to-speech functionality for farmers
 */

class VoiceService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.currentUtterance = null;
  }

  /**
   * Check if text-to-speech is supported
   * @returns {boolean}
   */
  isSupported() {
    return 'speechSynthesis' in window;
  }

  /**
   * Speak the given text
   * @param {string} text - Text to speak
   * @param {string} lang - Language code (default: 'en-US')
   */
  speak(text, lang = 'en-US') {
    if (!this.isSupported()) {
      console.warn('Text-to-speech is not supported in this browser');
      return;
    }

    // Cancel any ongoing speech
    this.stop();

    // Create new utterance
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = lang;
    this.currentUtterance.rate = 0.9; // Slightly slower for clarity
    this.currentUtterance.pitch = 1;
    this.currentUtterance.volume = 1;

    // Speak
    this.synthesis.speak(this.currentUtterance);
  }

  /**
   * Stop current speech
   */
  stop() {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }
  }

  /**
   * Pause current speech
   */
  pause() {
    if (this.synthesis.speaking && !this.synthesis.paused) {
      this.synthesis.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (this.synthesis.paused) {
      this.synthesis.resume();
    }
  }

  /**
   * Speak disease detection result
   * @param {Object} result - Detection result object
   * @param {string} lang - Language code
   */
  speakResult(result, lang = 'en-US') {
    const { disease, description, treatment } = result;
    
    let text = '';
    
    if (disease.toLowerCase() === 'healthy') {
      text = `Good news! Your crop is healthy. ${description || ''}`;
    } else {
      text = `Disease detected: ${disease}. ${description || ''} ${treatment ? `Treatment: ${treatment}` : ''}`;
    }

    this.speak(text, lang);
  }
}

// Create singleton instance
const voiceService = new VoiceService();

export default voiceService;
