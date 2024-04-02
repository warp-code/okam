from transformers import pipeline;

from transformers import AutoTokenizer, LlamaForCausalLM, LlamaTokenizer;
#, local_files_only=True
tokenizer = LlamaTokenizer.from_pretrained("mrsteyk/memepp-llama-512v-6l-8h-256e")
model = LlamaForCausalLM.from_pretrained("mrsteyk/memepp-llama-512v-6l-8h-256e")

nlp = pipeline("text-generation", model=model, tokenizer=tokenizer)

example = "Funny penguin"

ner_results = nlp(example, max_new_tokens=7)

print(ner_results)