#!/usr/bin/env python
import argparse
import os

import boto3
from dotenv import load_dotenv
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import TextToSpeechV1

# Load the environment variables from the .env file
load_dotenv()
LANGUAGECODE = "en-US"
OUTPUTFORMAT = "mp3"
# Retrieve the AWS access credentials from environment variables
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
IBM_API_KEY = os.getenv("IBM_ACCESS_KEY")
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


def missionControlVoice(text: str):
    """
    Uses Amazon Polly to synthesize speech for the given input text using the Ruth voice in English-US language.
    The synthesized audio file is saved in an S3 bucket named "lifeline-game-profil-mission-control".

    Args:
        text (str): The input text to synthesize speech.

    Returns:
        None
    """
    # Set the voice and output format
    voice_id = "Ruth"
    engine = "neural"
    outputs3bucketname = "lifeline-game-profil-mission-control"
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


def meVoice(text: str):
    """
    Uses Amazon Polly to synthesize speech for the given input text using the Joey voice in English-US language.
    The synthesized audio file is saved in an S3 bucket named "lifeline-game-profil-me".

    Args:
        text (str): The input text to synthesize speech.

    Returns:
        None
    """
    # Set the voice and output format
    voice_id = "Joey"
    engine = "neural"
    outputs3bucketname = "lifeline-game-profil-me"
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


def countdownVoice():
    authenticator = IAMAuthenticator(IBM_API_KEY)
    text_to_speech = TextToSpeechV1(authenticator=authenticator)
    url = "https://api.eu-de.text-to-speech.watson.cloud.ibm.com/instances/8f1e287d-3fc3-4f69-90a2-9e701e0df16a"
    voice = "en-US_MichaelV3Voice"
    text_to_speech.set_service_url(url)

    for i in range(1, 11):
        print(i)
        with open(f"{i}.wav", "wb") as audio_file:
            audio_file.write(
                text_to_speech.synthesize(str(i), voice=voice, accept="audio/wav")
                .get_result()
                .content
            )


if __name__ == "__main__":
    """
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--moderator", type=str, help="The text for the moderator to speak"
    )
    parser.add_argument(
        "--missioncontrol", type=str, help="The text for the missioncontrol to speak"
    )
    parser.add_argument("--female", type=str, help="The text for the female to say")
    parser.add_argument("--male", type=str, help="The text for the male to speak")
    parser.add_argument("--me", type=str, help="The text for me to speak")
    args = parser.parse_args()

    if args.moderator:
        text = args.moderator.strip("\"'")  # remove surrounding quotes if present
        moderatorVoice(text)

    if args.missioncontrol:
        text = args.missioncontrol.strip("\"'")
        missionControlVoice(text)

    if args.female:
        text = args.female.strip("\"'")
        femaleVoice(text)

    if args.male:
        text = args.male.strip("\"'")
        maleVoice(text)

    if args.me:
        text = args.me.strip("\"'")
        meVoice(text)
    """
    countdownVoice()
