<template>
    <div class="semicolon-key-lesson">
      <div class="lesson-container">
        <div class="lesson-text">
          <h2>Lesson 5: The ; Key</h2>
          <p class="instruction">
            {{ isLessonComplete 
              ? 'Lesson complete! Choose your next step.' 
              : 'Place your right pinky finger on the semicolon key and practice pressing it.' 
            }}
          </p>
          <p class="target-key" :class="{ 'completed': isLessonComplete }">
            {{ isLessonComplete ? '✓ Complete!' : 'Press: ;' }}
          </p>
          <p class="counter">Presses: {{ keyPressCount }} / {{ requiredPresses }}</p>
          <p v-if="isLessonComplete" class="success-message">
            Great job! You've completed the lesson!
          </p>
          <div v-if="isLessonComplete" class="button-container">
            <LessonNavigation 
            nextLessonKey="Next Lesson: l Key"
            @reset="resetLesson"
            @next="goToNextLesson"
            />
          </div>
        </div>
      </div>
      <KeyboardComponent 
        :activeKey="activeKey"
        :targetKey="targetKey"
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
    name: 'SemicolonKeyLesson',
    components: {
      KeyboardComponent,
      LessonNavigation
    },
    mixins: [keyboardMixin],
    data() {
      return {
        keyPressCount: 0,
        isLessonComplete: false,
        targetKey: ';',
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
        this.$router.push('/lessons/LKeyLesson')
      }
    }
  }
  </script>
  
 <style scoped>
.semicolon-key-lesson {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>