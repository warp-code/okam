from transformers import pipeline;
from transformers import AutoTokenizer, LlamaForCausalLM, LlamaTokenizer, GPT2LMHeadModel;

from typing import Dict

from ray import serve
from starlette.requests import Request

import os

tokenizer = AutoTokenizer.from_pretrained(os.getcwd() + "/.model/", local_files_only=True)
model = GPT2LMHeadModel.from_pretrained(os.getcwd() + "/.model/", local_files_only=True)
run_gen = pipeline("text-generation", model=model, tokenizer=tokenizer)

@serve.deployment(num_replicas=1, ray_actor_options={"num_cpus": 1, "num_gpus": 1})
class ModelDeployment:
  def __init__(self):
     self.run_gen = pipeline("text-generation", model=model, tokenizer=tokenizer)
  
  def generate(self, text: str):
      return run_gen(text)

  async def __call__(self, http_request: Request) -> Dict:
     data = await http_request.json()
     return self.generate(data["text"])

model_app = ModelDeployment.bind()