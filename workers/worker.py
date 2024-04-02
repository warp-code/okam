from transformers import pipeline;

from transformers import AutoTokenizer, LlamaForCausalLM, LlamaTokenizer, GPT2LMHeadModel;
#, local_files_only=True
tokenizer = AutoTokenizer.from_pretrained("Geralt-Targaryen/FantasyGPT-tiny")
model = GPT2LMHeadModel.from_pretrained("Geralt-Targaryen/FantasyGPT-tiny")

run_gen = pipeline("text-generation", model=model, tokenizer=tokenizer)

input = "The witcher sat, bloodied and weary,"

ner_results = run_gen(input)

print(ner_results)