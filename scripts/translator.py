from googletrans import Translator

def translate_text(text, source_lang, target_lang):
    translator = Translator()
    translated = translator.translate(text, src=source_lang, dest=target_lang)
    return translated.text

text_to_translate = "Hello, how are you?"
source_language = "en"
target_language = "de"

translated_text = translate_text(text_to_translate, source_language, target_language)
print(translated_text)