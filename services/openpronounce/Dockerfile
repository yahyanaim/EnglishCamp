FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1 \
    HF_HOME=/models OPENPRONOUNCE_DEVICE=cpu OPENPRONOUNCE_TTS=piper \
    OPENPRONOUNCE_TTS_VOICE=en_GB-cori-medium PORT=8000
RUN apt-get update && apt-get install -y --no-install-recommends git ffmpeg espeak-ng libsndfile1 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install torch --index-url https://download.pytorch.org/whl/cpu && pip install -r requirements.txt
# Download models while building; inference does not fetch a learner's voice from a third party.
RUN python -c "from openpronounce.speech import _load_models; _load_models(); from openpronounce.phones import _load_model; _load_model(); from openpronounce.audio import text2speech; text2speech('Hello, it is nice to meet you.')"
COPY app.py .
RUN useradd --uid 1000 --create-home camp && chown -R camp:camp /app /models /tmp/openpronounce
USER camp
EXPOSE 8000
CMD ["sh","-c","uvicorn app:app --host 0.0.0.0 --port ${PORT} --workers 1 --no-access-log"]
