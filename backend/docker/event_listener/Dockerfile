# --- Build the backend ---
FROM python:3.9.16

ENV WORK_DIR=/opt/event_listener

WORKDIR $WORK_DIR

RUN apt update && \
    apt install -y --no-install-recommends \
    curl \
    libcurl4 
# Install poetry
RUN pip install --upgrade pip
RUN curl -sSL https://install.python-poetry.org | POETRY_VERSION=1.3.2 POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# Copy poetry dependencies
COPY poetry.lock poetry.lock
COPY pyproject.toml pyproject.toml

RUN poetry export -o requirements.txt --without-hashes -f requirements.txt

RUN pip install -U pip \
    pip install -U setuptools
RUN pip install --no-cache-dir -r requirements.txt

COPY event_listener/ $WORK_DIR/event_listener/

ENV PYTHONPATH=${WORK_DIR}/

ENTRYPOINT ["python", "event_listener/main.py"]
