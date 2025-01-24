import google.generativeai as genai
import os
import glob

class Chat:
    genai.configure(api_key = os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel('gemini-pro')

    @classmethod
    def load_context(cls):
        context = []
        for file_path in glob.glob('data/*.md'):
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    context.append(file.read())
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")
        
        # Join context or return a default message if no files found
        return ' '.join(context) if context else "No markdown files found in the data directory."
    
        

    @classmethod
    def get_response(cls, user_message: str) -> str:
        try:
            context = cls.load_context()

            prompt = f"""You are a helpful, polite, and kind general-purpose assistant with knowledge about Cornell's Project Team: CU Sail.
            Use this context to answer user questions about CU Sail. If you do not know the answer, please apologize and say so.
            
            Context: {context}
            
            User question: {user_message}"""

            response = cls.model.generate_content(prompt)
            return response.text
        
        except Exception as e:
            return f"Sorry, I am unable to process your response at this time: {str(e)}"
            
