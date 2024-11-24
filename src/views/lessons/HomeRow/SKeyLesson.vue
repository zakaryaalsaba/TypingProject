<template>
  <div class="s-key-lesson">
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>Lesson 3: The s Key</h2>
        <p class="instruction">
          {{ isLessonComplete 
            ? 'Lesson complete! Choose your next step.' 
            : 'Place your left ring finger on the s key and practice pressing it.' 
          }}
        </p>
        <p class="target-key" :class="{ 'completed': isLessonComplete }">
          {{ isLessonComplete ? '✓ Complete!' : 'Press: s' }}
        </p>
        <p class="counter">Presses: {{ keyPressCount }} / {{ requiredPresses }}</p>
        <p v-if="isLessonComplete" class="success-message">
          Great job! You've completed the lesson!
        </p>
        <div v-if="isLessonComplete" class="button-container">
          <LessonNavigation 
            nextLessonKey="Next Lesson: a Key"
            @reset="resetLesson"
            @next="goToNextLesson"
          />
        </div>
      </div>
    </div>
    <KeyboardComponent 
      :activeKey="activeKey"
      :targetKey="targetKey"
      :activeFingers="activeFingers"
      :incorrectFingers="incorrectFingers"
      activeRow="home"
    />
  </div>
</template>

<script>
import { keyboardMixin } from '../../../mixins/keyboardMixin'
import KeyboardComponent from '../../../components/KeyboardComponent.vue'
import LessonNavigation from '../../../components/LessonNavigation.vue'
import '@/assets/styles/lessonStyles.css'

export default {
  name: 'SKeyLesson',
  components: {
    KeyboardComponent,
    LessonNavigation
  },
  mixins: [keyboardMixin],
  data() {
    return {
      keyPressCount: 0,
      isLessonComplete: false,
      targetKey: 's',
      requiredPresses: 10,
      activeKey: null
    }
  },
  methods: {
    handleLessonKeyPress(key) {
      if (this.isLessonComplete) return;

      if (key === this.targetKey) {
        if (this.keyPressCount < this.requiredPresses) {
          this.keyPressCount++
          if (this.keyPressCount >= this.requiredPresses) {
            this.isLessonComplete = true
            this.activeKey = null
          }
        }
      }
    },
    resetLesson() {
      this.keyPressCount = 0
      this.isLessonComplete = false
      this.activeKey = null
    },
    goToNextLesson() {
      this.$router.push('/lessons/AKeyLesson')
    }
  }
}
</script>

<style scoped>
.s-key-lesson {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.lesson-container {
  text-align: center;
  margin-bottom: 40px;
}

.lesson-text {
  max-width: 600px;
  margin: 0 auto;
}

.target-key {
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
  color: #2c3e50;
}

.target-key.completed {
  color: #4CAF50;
}

.counter {
  font-size: 18px;
  color: #666;
}

.instruction {
  color: #666;
  margin: 10px 0;
  transition: color 0.3s ease;
}

.success-message {
  color: #4CAF50;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  animation: fadeIn 0.5s ease-out;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.try-again-btn {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: fadeIn 0.5s ease-out;
}

.try-again-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.try-again-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
}

.next-lesson-btn {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  animation: fadeIn 0.5s ease-out;
}

.next-lesson-btn:hover {
  background-color: #219a52;
  transform: translateY(-2px);
}

.next-lesson-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 