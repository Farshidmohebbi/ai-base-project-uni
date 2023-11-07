from pydantic import BaseModel


class NumberModel(BaseModel):
    number: int
    lang: str = 'en'

class TextModel(BaseModel):
    text: str
    source_lang: str = 'en'
    target_lang: str = 'en' 


class SpeechModel(BaseModel):
    text: str
    lang: str = 'en'