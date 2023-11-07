import pyttsx3

# HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_DAVID_11.0
# HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_ZIRA_11.0


def convert_text_to_speech(text, output_file, language, voice_id, speed):
    engine = pyttsx3.init()
    engine.setProperty('voice', voice_id)  # Set the voice
    engine.setProperty('rate', speed)  # Set the speech speed
    engine.save_to_file(text, output_file)
    engine.runAndWait()

text = "einhundertzwanzig"
output_file = "output.wav"
language = 'de'  # Language code for German
voice_id = 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_DAVID_11.0'  # Voice ID for the desired voice
speed = 150  # Speech speed (words per minute)

convert_text_to_speech(text, output_file, language, voice_id, speed)