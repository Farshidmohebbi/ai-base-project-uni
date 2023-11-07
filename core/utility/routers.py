from fastapi import APIRouter, status, HTTPException, Depends, UploadFile, File
from fastapi.responses import JSONResponse
from starlette.responses import FileResponse
from pydantic import BaseModel
from num2words import num2words
from googletrans import Translator
import pyttsx3
from . import schemas
import io
from PIL import ImageGrab, Image
import numpy as np
from keras.models import load_model
import cv2
router = APIRouter(prefix="/utility/api/v1", tags=["utility"])


def translate_text(text, source_lang, target_lang):
    translator = Translator()
    translated = translator.translate(text, src=source_lang, dest=target_lang)
    return translated.text


@router.post("/number-to-text/")
async def convert_to_words(item: schemas.NumberModel):
    words = num2words(item.number, lang=item.lang)
    return JSONResponse(
        content={"text": words},
        status_code=status.HTTP_200_OK,
    )


@router.post("/text-translator/")
async def translate_sentence(item: schemas.TextModel):
    text_to_translate = item.text
    source_language = item.source_lang
    target_language = item.target_lang

    translated_text = translate_text(
        text_to_translate, source_language, target_language)
    return JSONResponse(
        content={"text": translated_text},
        status_code=status.HTTP_200_OK,
    )


def convert_text_to_speech(text, output_file, language, speed):
    engine = pyttsx3.init()
    engine.setProperty('rate', speed)  # Set the speech speed
    engine.save_to_file(text, output_file)
    engine.runAndWait()


@router.post("/text-to-speech/")
def text_to_speech(item: schemas.SpeechModel):
    text = item.text
    language = item.lang
    output_file = "output.wav"
    speed = 150  # Speech speed (words per minute)
    convert_text_to_speech(text, output_file, language, speed)
    return FileResponse(output_file, media_type="audio/wav")


model = load_model('./utility/mnist.h5')


async def predict_digit(img):
    # Convert RGB to grayscale
    img_gray = np.array(Image.fromarray(img).convert('L'))

    # Resize image to 28x28 pixels
    img_resized = np.array(Image.fromarray(img_gray).resize((28, 28)))

    # Reshape and normalize the image
    img_reshaped = img_resized.reshape(1, 28, 28, 1)
    img_normalized = img_reshaped / 255.0

    # Predict the class
    res = model.predict([img_normalized])[0]
    digit = int(np.argmax(res))
    acc = round(float(max(res)),4)
    return digit, acc

@router.post("/predict-number/")
async def predict_number(image: UploadFile = File(...)):
    contents = await image.read()
    nparr = np.fromstring(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    digit, acc = await predict_digit(img)
    print(digit, acc)
    return JSONResponse(
        content={"text": digit, "accuracy": float(acc)},
        status_code=status.HTTP_200_OK,
    )
