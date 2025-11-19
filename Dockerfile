# 1. Use an official Python base image
FROM python:3.10-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the dependency list and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy your model and source code into the container
COPY ./models /app/models
COPY ./src /app/src

# 5. Expose the port the app will run on
EXPOSE 8000

# 6. Command to run the application
# We use 0.0.0.0 to allow traffic from outside the container
CMD ["uvicorn", "src.predict_api:app", "--host", "0.0.0.0", "--port", "8000"]