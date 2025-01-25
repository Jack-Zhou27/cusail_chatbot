from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import DataFrameLoader
from langchain_community.vectorstores import Qdrant
import pandas as pd
from dotenv import load_dotenv
import os
import glob
from langchain.schema import SystemMessage, HumanMessage, AIMessage

# Load environment variables
load_dotenv()

# Access the API key
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("API key not found. Please add it to the .env file.")

# Initialize chat
chat = ChatOpenAI(model='gpt-3.5-turbo')
messages = []


def add_human_prompt(content):
    messages.append(HumanMessage(content=content))


def get_response(prompt):
    augmented_prompt = custom_prompt(qdrant_cusail, prompt)
    add_human_prompt(augmented_prompt)
    res = chat.invoke(messages)
    return res.content


def load_data():
    directory_path = 'data'
    extensions = ["md", "tex"]

    # Collect all matching file paths
    file_paths = []
    for ext in extensions:
        file_paths.extend(glob.glob(f"{directory_path}/*.{ext}"))

    all_data = []
    for file_path in file_paths:
        with open(file_path, 'r') as file:
            text = file.read()

        # Split text into chunks
        def split_text_into_chunks(text, chunk_size=500):
            words = text.split()
            return [' '.join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size)]

        chunks = split_text_into_chunks(text)

        for chunk in chunks:
            all_data.append({'chunk': chunk, 'source': file_path})

    df = pd.DataFrame(all_data)

    # Load the DataFrame as documents
    loader = DataFrameLoader(df, page_content_column="chunk")
    documents = loader.load()

    return documents


def qdrant_client():
    cusail_documents = load_data()
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    url = 'http://localhost:6333'
    return Qdrant.from_documents(
        documents=cusail_documents,
        embedding=embeddings,
        url=url,
        collection_name="cusail_chatbot",
    )


def custom_prompt(client, query: str):
    results = client.similarity_search(query, k=3)
    source_knowledge = "\n".join([x.page_content for x in results])
    augment_prompt = f"""You are a helpful, polite, and kind general-purpose assistant with knowledge about Cornell's Project Team: CU Sail.
            Use this context to answer user questions about CU Sail. If you do not know the answer, please apologize and say so. Use the contexts below to answer the query:

    Contexts:
    {source_knowledge}
    Query: {query}"""
    return augment_prompt


qdrant_cusail = qdrant_client()
