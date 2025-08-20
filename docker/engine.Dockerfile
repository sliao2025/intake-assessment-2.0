FROM python:3.13-slim

WORKDIR /app

COPY src/app/engine .

EXPOSE 8000
CMD ["python3","app.py"]