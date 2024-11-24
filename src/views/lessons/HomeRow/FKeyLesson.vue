<template>
  <div class="f-key-lesson">
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>Lesson 1: The f Key</h2>
        <p class="instruction">
          {{ isLessonComplete 
            ? 'Lesson complete! Choose your next step.' 
            : 'Place your left index finger on the f key and practice pressing it.' 
          }}
        </p>
        <p class="target-key" :class="{ 'completed': isLessonComplete }">
          {{ isLessonComplete ? '✓ Complete!' : 'Press: f' }}
        </p>
        <p class="counter">Presses: {{ keyPressCount }} / {{ requiredPresses }}</p>
        <p v-if="isLessonComplete" class="success-message">
          Great job! You've completed the lesson!
        </p>
        <div v-if="isLessonComplete" class="button-container">
          <LessonNavigation 
            nextLessonKey="Next Lesson: d Key"
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
  name: 'FKeyLesson',
  components: {
    KeyboardComponent,
    LessonNavigation
  },
  mixins: [keyboardMixin],
  data() {
    return {
      keyPressCount: 0,
      isLessonComplete: false,
      targetKey: 'f',
      requiredPresses: 10
    }
  },
  methods: {
    handleLessonKeyPress(key) {
      if (this.isLessonComplete) {
        if (key === 'enter') {
          this.goToNextLesson();
        }
        return;
      }

      if (key === this.targetKey) {
        if (this.keyPressCount < this.requiredPresses) {
          this.keyPressCount++
          if (this.keyPressCount >= this.requiredPresses) {
            this.isLessonComplete = true
            // Clear active states
            this.activeKey = null
            this.activeFingers.clear()
          }
        }
      }
    },
    resetLesson() {
      this.keyPressCount = 0
      this.isLessonComplete = false
      this.activeKey = null
      this.activeFingers.clear()
      this.incorrectFingers.clear()
    },
    goToNextLesson() {
      this.$router.push('/lessons/DKeyLesson')
    }
  }
}
</script>

<style scoped>
.f-key-lesson {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>