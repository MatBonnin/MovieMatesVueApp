<template>
  <div id="app">
    <h1>Chatbot PWA avec ChatGPT</h1>
    <div>
      <input
        v-model="userInput"
        @keyup.enter="sendRequest"
        style="color: white"
        placeholder="Tapez votre message ici"
      />
      <button @click="sendRequest">Envoyer</button>
    </div>
    <div>
      <ul>
        <li v-for="(message, index) in messages" :key="index">
          <strong>{{ message.sender }}:</strong> {{ message.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "chat",
  data() {
    return {
      userInput: "",
      messages: [],
    };
  },
  methods: {
    async sendRequest() {
      if (!this.userInput) return;

      this.messages.push({ sender: "Vous", content: this.userInput });

      const prompt = this.userInput;
      this.userInput = "";

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
        }
      );
      console.log(response);
      const chatGPTResponse = response.data.choices[0].message.content;
      this.messages.push({ sender: "ChatGPT", content: chatGPTResponse });
    },
  },
});
</script>

<style>
/* Ajoutez vos styles ici */
body {
  font-family: "Roboto", sans-serif;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  flex-direction: column;
  background-color: black;
}

.chat-container {
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.user {
  text-align: right;
  font-weight: 500;
  color: #1a73e8;
}

.chatgpt {
  text-align: left;
  font-weight: 500;
  color: #db4437;
}

.input-container {
  display: flex;
  background-color: #f2f2f2;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
}

input[type="text"] {
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: 500;
  color: white;
}

button {
  background-color: #1a73e8;
  color: white;
  font-weight: 500;
  font-size: 16px;
  border: none;
  outline: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

button:hover {
  background-color: #1669d2;
}

button:disabled {
  background-color: #b7d1f5;
  cursor: not-allowed;
}
</style>
