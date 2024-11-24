<template>
    <div class="g-key-lesson">
      <div class="lesson-container">
        <div class="lesson-text">
          <h2>Lesson 10: The g Key</h2>
          <p class="instruction">
            {{ isLessonComplete 
              ? 'Lesson complete! Choose your next step.' 
              : 'Move your left index finger one key to the right from f, and practice pressing the g key.' 
            }}
          </p>
          <p class="finger-movement-tip">
            <span class="movement-arrow">→</span> 
            Move left index finger right from home position (f) to g
          </p>
          <p class="target-key" :class="{ 'completed': isLessonComplete }">
            {{ isLessonComplete ? '✓ Complete!' : 'Press: g' }}
          </p>
          <p class="counter">Presses: {{ keyPressCount }} / {{ requiredPresses }}</p>
          <p v-if="isLessonComplete" class="success-message">
            Great job! You've completed the lesson!
          </p>
          <div v-if="isLessonComplete" class="button-container">
            <LessonNavigation 
            nextLessonKey="Next Lesson: g & h Key"
            @reset="resetLesson"
            @next="goToNextLesson"
            />
          </div>
        </div>
      </div>
      <KeyboardComponent 
        :activeKey="activeKey"
        :targetKey="targetKey"
      />
    </div>
  </template>
  
  <script>
  import { keyboardMixin } from '../../../mixins/keyboardMixin'
  import KeyboardComponent from '../../../components/KeyboardComponent.vue'
  import LessonNavigation from '../../../components/LessonNavigation.vue'
  import '@/assets/styles/lessonStyles.css'
  
  export default {
    name: 'GKeyLesson',
    components: {
      KeyboardComponent,
      LessonNavigation
    },
    mixins: [keyboardMixin],
    data() {
      return {
        keyPressCount: 0,
        isLessonComplete: false,
        targetKey: 'g',
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
        this.$router.push('/lessons/GHKeyLesson')
      }
    }
  }
  </script>
  
  <style scoped>
  .g-key-lesson {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  </style>