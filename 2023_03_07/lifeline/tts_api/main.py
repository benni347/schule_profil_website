import os

import boto3
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv()
LANGUAGECODE = "en-US"
OUTPUTFORMAT = "mp3"
# Retrieve the AWS access credentials from environment variables
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
# Set the AWS region
REGION_NAME = "us-west-2"
TEXTTYPE = "text"
# Create a Polly client with the retrieved credentials
POLLY_CLIENT = boto3.client(
    "polly",
    region_name=REGION_NAME,
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)
SAMPLERATE = "24000"


def moderatorVoice(text: str):
    """
    Uses Amazon Polly to synthesize speech for the given input text using the Stephen voice in English-US language.
    The synthesized audio file is saved in an S3 bucket named "lifeline-game-prfil-moderator".

    Args:
        text (str): The input text to synthesize speech.

    Returns:
        None
    """
    voice_id = "Stephen"
    engine = "neural"
    outputs3bucketname = "lifeline-game-prfil-moderator"
    response = POLLY_CLIENT.start_speech_synthesis_task(
        Engine=engine,
        LanguageCode=LANGUAGECODE,
        OutputFormat=OUTPUTFORMAT,
        SampleRate=SAMPLERATE,
        TextType=TEXTTYPE,
        VoiceId=voice_id,
        Text=text,
        OutputS3BucketName=outputs3bucketname,
    )
    task_id = response["SynthesisTask"]["TaskId"]
    while True:
        task = POLLY_CLIENT.get_speech_synthesis_task(TaskId=task_id)
        print(task)
        task_status = task["SynthesisTask"]["TaskStatus"]
        if task_status == "completed":
            print("Done")
            break


def maleVoice(text: str):
    """
    Uses Amazon Polly to synthesize speech for the given input text using the Matthew voice in English-US language.
    The synthesized audio file is saved in an S3 bucket named "lifeline-game-profil-male".

    Args:
        text (str): The input text to synthesize speech.

    Returns:
        None
    """
    voice_id = "Matthew"
    engine = "neural"
    outputs3bucketname = "lifeline-game-profil-male"
    response = POLLY_CLIENT.start_speech_synthesis_task(
        Engine=engine,
        LanguageCode=LANGUAGECODE,
        OutputFormat=OUTPUTFORMAT,
        SampleRate=SAMPLERATE,
        TextType=TEXTTYPE,
        VoiceId=voice_id,
        Text=text,
        OutputS3BucketName=outputs3bucketname,
    )
    task_id = response["SynthesisTask"]["TaskId"]
    while True:
        task = POLLY_CLIENT.get_speech_synthesis_task(TaskId=task_id)
        task_status = task["SynthesisTask"]["TaskStatus"]
        if task_status == "completed":
            print("Done")
            break


def femaleVoice(text: str):
    """
    Uses Amazon Polly to synthesize speech for the given input text using the Joanna voice in English-US language.
    The synthesized audio file is saved in an S3 bucket named "lifeline-game-profil-female".

    Args:
        text (str): The input text to synthesize speech.

    Returns:
        None
    """
    # Set the voice and output format
    voice_id = "Joanna"
    engine = "neural"
    outputs3bucketname = "lifeline-game-profil-female"
    response = POLLY_CLIENT.start_speech_synthesis_task(
        Engine=engine,
        LanguageCode=LANGUAGECODE,
        OutputFormat=OUTPUTFORMAT,
        SampleRate=SAMPLERATE,
        TextType=TEXTTYPE,
        VoiceId=voice_id,
        Text=text,
        OutputS3BucketName=outputs3bucketname,
    )
    task_id = response["SynthesisTask"]["TaskId"]
    while True:
        task = POLLY_CLIENT.get_speech_synthesis_task(TaskId=task_id)
        task_status = task["SynthesisTask"]["TaskStatus"]
        if task_status == "completed":
            print("Done")
            break


if __name__ == "__main__":
    # Do something
    return
