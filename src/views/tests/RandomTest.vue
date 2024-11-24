<template>
    <div class="typing-test">
      <div class="test-container">
        <div class="test-header">
          <h2>Typing Speed Test</h2>
          <p class="instruction">
            {{ isTestActive 
              ? 'Type the text below:' 
              : 'Start typing to begin the test' 
            }}
          </p>
        </div>
  
        <div class="stats-panel">
          <div class="stat-item">
            <div class="stat-value">{{ wpm }}</div>
            <div class="stat-label">Words/min</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ accuracy }}%</div>
            <div class="stat-label">Accuracy</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ formatTime(elapsedTime) }}</div>
            <div class="stat-label">Time</div>
          </div>
        </div>
  
        <div class="test-text" 
             :class="{ 'active': isTestActive }">
          <span v-for="(char, index) in testText" 
                :key="index"
                :class="{
                  'completed': index < userInput.length,
                  'current': index === userInput.length,
                  'error': errors[index]
                }">
            {{ char }}
          </span>
        </div>
  
        <div class="test-controls">
          <button @click="restartTest" class="restart-btn">
            Restart Test
          </button>
          <button @click="newTest" class="new-test-btn">
            Try New Text
          </button>
        </div>
      </div>
  
      <KeyboardTestComponent 
        :activeKey="activeKey"
        :targetKey="targetKey"
      />
    </div>
  </template>
  
  <script>
  import KeyboardTestComponent from '@/components/KeyboardTestComponent.vue'
  
  export default {
    name: 'RandomTest',
    components: {
      KeyboardTestComponent
    },
    data() {
      return {
        testText: '',
        userInput: '',
        isTestActive: false,
        startTime: null,
        elapsedTime: 0,
        wpm: 0,
        accuracy: 100,
        errors: {},
        activeKey: null,
        targetKey: '',
        timer: null
      }
    },
    methods: {
      generateText() {
        // This is a placeholder. You'll need to implement text generation
        // or fetch from an API
        return "Sample text for typing test...";
      },
      startTest() {
        this.isTestActive = true;
        this.startTime = Date.now();
        this.timer = setInterval(this.updateTime, 1000);
      },
      updateTime() {
        if (this.startTime) {
          this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        }
      },
      calculateStats() {
        // Calculate WPM
        const minutes = this.elapsedTime / 60;
        const words = this.userInput.length / 5; // Standard: 5 chars = 1 word
        this.wpm = Math.round(words / minutes);
  
        // Calculate accuracy
        const totalErrors = Object.values(this.errors).filter(Boolean).length;
        this.accuracy = Math.round(((this.userInput.length - totalErrors) / this.userInput.length) * 100) || 100;
      },
      handleKeyPress(event) {
        if (!this.isTestActive) {
          this.startTest();
        }
  
        const key = event.key;
        this.activeKey = key;
  
        if (key === this.testText[this.userInput.length]) {
          this.userInput += key;
          this.errors[this.userInput.length - 1] = false;
        } else {
          this.errors[this.userInput.length] = true;
        }
  
        this.calculateStats();
        this.targetKey = this.testText[this.userInput.length] || '';
  
        setTimeout(() => {
          this.activeKey = null;
        }, 100);
      },
      formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      },
      restartTest() {
        this.userInput = '';
        this.isTestActive = false;
        this.startTime = null;
        this.elapsedTime = 0;
        this.wpm = 0;
        this.accuracy = 100;
        this.errors = {};
        this.activeKey = null;
        this.targetKey = this.testText[0] || '';
        clearInterval(this.timer);
      },
      newTest() {
        this.testText = this.generateText();
        this.restartTest();
      }
    },
    mounted() {
      this.testText = this.generateText();
      this.targetKey = this.testText[0] || '';
      window.addEventListener('keypress', this.handleKeyPress);
    },
    beforeDestroy() {
      window.removeEventListener('keypress', this.handleKeyPress);
      clearInterval(this.timer);
    }
  }
  </script>
  
  <style scoped>
  .typing-test {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .test-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .stats-panel {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    padding: 15px;
    background: #f5f5f5;
    border-radius: 8px;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #2196F3;
  }
  
  .stat-label {
    font-size: 14px;
    color: #666;
  }
  
  .test-text {
    font-size: 20px;
    line-height: 1.6;
    margin: 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .test-text span {
    padding: 0 1px;
  }
  
  .test-text span.completed {
    color: #4CAF50;
  }
  
  .test-text span.current {
    border-bottom: 2px solid #2196F3;
  }
  
  .test-text span.error {
    color: #f44336;
    text-decoration: underline wavy #f44336;
  }
  
  .test-controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }
  
  .restart-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .new-test-btn {
    background-color: #2196F3;
    color: white;
  }
  
  button:hover {
    opacity: 0.9;
  }
  </style>