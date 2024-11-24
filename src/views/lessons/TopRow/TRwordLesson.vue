<template>
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>Top Row: Q to P  Word Practice</h2>
        <p class="instruction">
          {{ isLessonComplete 
            ? 'Lesson complete! Choose your next step.' 
            : `Practice typing common words using Q to P keys` 
          }}
        </p>
        <p class="target-key" :class="{ 'completed': isLessonComplete }">
          {{ isLessonComplete ? '✓ Complete!' : `Type: ${targetKey}` }}
        </p>
        <p class="counter">Completed: {{ keyPressCount }} / {{ requiredPresses }}</p>
        <p v-if="isLessonComplete" class="success-message">
          Great job! You've completed the lesson!
        </p>
        <div v-if="isLessonComplete" class="button-container">
          <LessonNavigation 
            nextLessonKey="Next Lesson: TY Keys"
            RandomSequence="Try Different Words"
            :isMultiKeyLesson="true"
            @reset="resetLesson"
            @next="goToNextLesson"
            @random="tryRandomPair"
          />
        </div>
      </div>
  
      <KeyboardComponent 
        :activeKey="activeKey"
        :targetKey="targetKey[currentKeyIndex]"
        activeRow="top"
      />
    </div>
  </template>
  
  <script>
  import { keyboardMixin } from '@/mixins/keyboardMixin'
  import KeyboardComponent from '@/components/KeyboardComponent.vue'
  import LessonNavigation from '@/components/LessonNavigation.vue'
  import '@/assets/styles/lessonStyles.css'
  
  export default {
    name: 'TRwordLesson',
    components: {
      KeyboardComponent,
      LessonNavigation
    },
    mixins: [keyboardMixin],
    data() {
      return {
        keyPressCount: 0,
        isLessonComplete: false,
        requiredPresses: 10,
        activeKey: null,
        currentKeyIndex: 0,
        keySequence: ['try', 'type', 'trip', 'tier', 'tire'],
        currentWord: 'try',
        wordList: {
          basic: ['try', 'type', 'trip', 'tier', 'tire'],
          advanced: ['type', 'trip', 'tier', 'tire', 'ripe', 'wipe', 'wire']
        }
      }
    },
    computed: {
      targetKey() {
        return this.currentWord
      }
    },
    methods: {
      handleLessonKeyPress(key) {
        if (this.isLessonComplete) return;
  
        if (key === this.targetKey[this.currentKeyIndex]) {
          this.activeKey = key
          
          setTimeout(() => {
            this.currentKeyIndex++
            this.activeKey = null
            
            if (this.currentKeyIndex >= this.targetKey.length) {
              this.keyPressCount++
              this.currentKeyIndex = 0
              this.currentWord = this.keySequence[this.keyPressCount % this.keySequence.length]
              
              if (this.keyPressCount >= this.requiredPresses) {
                this.isLessonComplete = true
              }
            }
          }, 100)
        } else {
          this.activeKey = key
          setTimeout(() => {
            this.activeKey = null
          }, 100)
        }
      },
      tryRandomPair() {
        this.keySequence = [...this.wordList.advanced].sort(() => Math.random() - 0.5)
        this.currentWord = this.keySequence[0]
        this.resetLesson()
      },
      resetLesson() {
        this.keyPressCount = 0
        this.isLessonComplete = false
        this.activeKey = null
        this.currentKeyIndex = 0
        this.currentWord = this.keySequence[0]
      },
      goToNextLesson() {
        this.$router.push('/tests/TopRowTest')
      }
    }
  }
  </script>

  <style scoped>
  .button-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  </style>