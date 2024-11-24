<template>
  <div id="devHome">
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>Welcome to FixTyping</h2>
      </div>
    </div>
    <div class="hands-instruction">
      <p class="finger-movement-tip">
        Always keep your hands in this default position when typing. 
        Your fingers should rest on the home row keys (ASDF for left hand, JKL; for right hand) 
        as shown in the image below:
      </p>
    </div>
    <img 
      src="@/assets/homehands.png" 
      alt="Home row hand position"
      class="home-hands-image"
    />
    <div>
      <p class="instruction">Choose a lesson category to begin:</p>
      <div class="button-container">
        <button 
          @click="goToFLesson" 
          class="next-lesson-btn home-row"
        >
          Start Home Row Lessons
        </button>
        <button 
          @click="goToTLesson" 
          class="next-lesson-btn top-row"
        >
          Start Top Row Lessons
        </button>
        <button 
          @click="goToBLesson" 
          class="next-lesson-btn bottom-row"
        >
          Start Bottom Row Lessons
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { keyboardMixin } from '../mixins/keyboardMixin'
import KeyboardComponent from '../components/KeyboardComponent.vue'

export default {
  name: 'Home',
  components: {
    KeyboardComponent
  },
  mixins: [keyboardMixin],
  methods: {
    goToFLesson() {
      this.$router.push('/lessons/FKeyLesson')
    },
    goToTLesson() {
      this.$router.push('/lessons/TKeyLesson')
    },
    goToBLesson() {
      this.$router.push('/lessons/BKeyLesson')
    }
  }
}
</script> 

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.next-lesson-btn {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 12px 24px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.next-lesson-btn.home-row {
  background-color: #27ae60;
}

.next-lesson-btn.home-row:hover {
  background-color: #219a52;
}

.next-lesson-btn.top-row {
  background-color: #3498db;
}

.next-lesson-btn.top-row:hover {
  background-color: #2980b9;
}

.next-lesson-btn.bottom-row {
  background-color: #e74c3c;
}

.next-lesson-btn.bottom-row:hover {
  background-color: #c0392b;
}

.next-lesson-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.3);
}

.hands-instruction {
  max-width: 800px;
  margin: 30px auto 20px;
  padding: 0 20px;
}

.finger-movement-tip {
  background-color: #f8f4ff;
  border: 1px solid #e6d8ff;
  border-radius: 8px;
  padding: 15px 20px;
  font-size: 16px;
  line-height: 1.6;
  color: #4a4a4a;
  text-align: left;
  margin: 10px 0;
}

.movement-arrow {
  margin-right: 8px;
  font-size: 18px;
}

.key-text {
  background-color: #e6d8ff;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  color: #6b4fbb;
  font-weight: 500;
}

.home-hands-image {
  max-width: 100%;
  height: auto;
  margin: 20px auto;
  display: block;
}
</style>