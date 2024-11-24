<template>
  <div class="typing-area">
    <div class="stats">
      <div>WPM: {{ wpm }}</div>
      <div>Accuracy: {{ accuracy }}%</div>
      <div>Time: {{ timer }}s</div>
    </div>
    
    <div class="text-display" :class="{ 'error': hasError }">
      <span
        v-for="(char, index) in text"
        :key="index"
        :class="{
          'current': index === currentIndex,
          'correct': index < currentIndex && userInput[index] === char,
          'incorrect': index < currentIndex && userInput[index] !== char
        }"
      >{{ char }}</span>
    </div>
    
    <textarea
      ref="inputArea"
      v-model="userInput"
      @input="handleInput"
      :disabled="isComplete"
      placeholder="Start typing here..."
      class="input-area"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'TypingArea',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userInput: '',
      currentIndex: 0,
      startTime: null,
      timer: 0,
      wpm: 0,
      accuracy: 100,
      isComplete: false,
      hasError: false,
      timerInterval: null
    }
  },
  methods: {
    handleInput(e) {
      if (!this.startTime) {
        this.startTime = new Date()
        this.startTimer()
      }

      this.userInput = e.target.value
      this.currentIndex = this.userInput.length
      
      // Check for errors
      this.hasError = this.userInput[this.currentIndex - 1] !== this.text[this.currentIndex - 1]
      
      // Calculate accuracy
      let correct = 0
      for (let i = 0; i < this.currentIndex; i++) {
        if (this.userInput[i] === this.text[i]) correct++
      }
      this.accuracy = Math.round((correct / this.currentIndex) * 100) || 100

      // Calculate WPM
      const timeElapsed = (new Date() - this.startTime) / 1000 / 60 // in minutes
      const wordsTyped = this.userInput.length / 5
      this.wpm = Math.round(wordsTyped / timeElapsed) || 0

      // Check if complete
      if (this.currentIndex === this.text.length) {
        this.isComplete = true
        clearInterval(this.timerInterval)
        this.$emit('complete', {
          wpm: this.wpm,
          accuracy: this.accuracy,
          time: this.timer
        })
      }
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timer++
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.timerInterval)
  }
}
</script>

<style scoped>
.typing-area {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  font-size: 1.2em;
  font-weight: bold;
}

.text-display {
  font-size: 1.2em;
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  white-space: pre-wrap;
}

.text-display.error {
  background: #ffe6e6;
}

.current {
  background: #42b983;
  color: white;
}

.correct {
  color: #42b983;
}

.incorrect {
  color: red;
  text-decoration: underline;
}

.input-area {
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 1.1em;
  border: 2px solid #ddd;
  border-radius: 8px;
  resize: none;
}

.input-area:focus {
  outline: none;
  border-color: #42b983;
}
</style> 