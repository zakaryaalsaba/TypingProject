<template>
  <div class="lesson-container">
    <div class="lesson-text">
      <h2>Top Row Typing Test</h2>
      <p class="instruction">
        {{ isTestComplete 
          ? 'Test complete! Try again or return to lessons.' 
          : 'Type the following text:' 
        }}
      </p>
      <p class="target-key" :class="{ 'completed': isTestComplete }">
        {{ isTestComplete ? '✓ Complete!' : `Next key: ${targetKey}` }}
      </p>
      <div class="test-text">
        <span 
          v-for="(char, index) in currentText" 
          :key="index"
          :class="{
            'completed': index < userInput.length,
            'current': index === userInput.length
          }"
        >
          {{ char }}
        </span>
      </div>
      <div class="stats">
        <p>Accuracy: {{ accuracy }}%</p>
        <p>WPM: {{ wpm }}</p>
      </div>
      <div v-if="isTestComplete" class="button-container">
        <LessonNavigation 
            nextLessonKey="Return to Home"
            RandomSequence="Try New Text"
            :isMultiKeyLesson="true"
            @reset="resetTest"
            @next="returnHome"
            @random="tryNewText"
          />
      </div>
    </div>

    <KeyboardTestComponent 
      :activeKey="activeKey"
      :targetKey="targetKey"
      activeRow="top"
    />
  </div>
</template>

<script>
import { keyboardMixin } from '@/mixins/keyboardMixin'
import KeyboardTestComponent from '@/components/KeyboardTestComponent.vue'
import LessonNavigation from '@/components/LessonNavigation.vue'

export default {
  name: 'TopRowTest',
  components: {
    KeyboardTestComponent,
    LessonNavigation
  },
  mixins: [keyboardMixin],
  data() {
    return {
      homeRowChars: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      currentText: '',
      userInput: '',
      activeKey: null,
      targetKey: '',
      hasError: false,
      startTime: null,
      accuracy: 100,
      wpm: 0,
      errors: 0,
      isTestComplete: false
    }
  },
  methods: {
    generateText(length = 20) {
      return Array(length)
        .fill()
        .map(() => this.homeRowChars[Math.floor(Math.random() * this.homeRowChars.length)])
        .join('');
    },
    handleLessonKeyPress(key) {
      if (this.isTestComplete) {
        if (key === 'enter') {
          this.returnHome();
          return;
        }
      }

      if (!this.startTime) {
        this.startTime = new Date();
      }

      this.activeKey = key;
      const currentIndex = this.userInput.length;
      const expectedKey = this.currentText[currentIndex];

      if (key === expectedKey) {
        this.userInput += key;
        this.targetKey = this.currentText[this.userInput.length] || '';
        
        if (this.userInput.length === this.currentText.length) {
          this.completeTest();
        }
      } else {
        this.errors++;
      }

      // Calculate stats
      this.calculateStats();

      setTimeout(() => {
        this.activeKey = null;
      }, 100);
    },
    calculateStats() {
      // Calculate accuracy
      const totalAttempts = this.userInput.length + this.errors;
      this.accuracy = totalAttempts ? Math.round(((totalAttempts - this.errors) / totalAttempts) * 100) : 100;

      // Calculate WPM
      const timeElapsed = (new Date() - this.startTime) / 1000 / 60; // in minutes
      if (timeElapsed > 0 && this.userInput.length > 0) {
        this.wpm = Math.round((this.userInput.length / 5) / timeElapsed);
      } else {
        this.wpm = 0;  // Set to 0 instead of showing NaN
      }
    },
    completeTest() {
      this.isTestComplete = true;
      this.$emit('test-complete', {
        wpm: this.wpm,
        accuracy: this.accuracy
      });
    },
    tryNewText() {
      this.currentText = this.generateText();
      this.resetTest();
    },
    resetTest() {
      this.userInput = '';
      this.hasError = false;
      this.startTime = null;
      this.accuracy = 100;
      this.wpm = 0;
      this.errors = 0;
      this.isTestComplete = false;
      this.targetKey = this.currentText[0];
    },
    returnHome() {
      this.$router.push('/');
    }
  },
  mounted() {
    this.currentText = this.generateText();
    this.targetKey = this.currentText[0];
  }
}
</script>

<style scoped>
.lesson-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.lesson-text {
  text-align: center;
  margin-bottom: 2rem;
}

.test-text {
  font-size: 24px;
  margin: 20px 0;
  letter-spacing: 2px;
  line-height: 1.5;
  font-family: monospace;
}

.test-text span {
  padding: 0 2px;
}

.test-text span.completed {
  color: #4CAF50;
}

.test-text span.current {
  border-bottom: 2px solid #2196F3;
}

.target-key {
  font-size: 24px;
  margin: 20px 0;
  color: #2196F3;
}

.target-key.completed {
  color: #4CAF50;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  font-size: 18px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.new-text-btn {
  background-color: #2196F3;
  color: white;
}

.try-again-btn {
  background-color: #4CAF50;
  color: white;
}

.return-btn {
  background-color: #9c27b0;
  color: white;
}

button:hover {
  opacity: 0.9;
}

.instruction {
  font-size: 18px;
  color: #666;
  margin: 10px 0;
}
</style>