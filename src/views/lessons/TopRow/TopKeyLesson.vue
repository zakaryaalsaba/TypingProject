<template>
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>Top Row Keys</h2>
        <p class="instruction">
          {{ isLessonComplete 
            ? 'Lesson complete! Choose your next step.' 
            : `Practice pressing the top row keys in sequence` 
          }}
        </p>
        <p class="finger-movement-tip">
          <span class="movement-arrow">↑</span> 
          {{ isOriginalPair 
            ? 'Practice typing all keys in the top row from Q to P'
            : 'Practice reaching from home row position to top row keys'
          }}
        </p>
        <p class="target-key" :class="{ 'completed': isLessonComplete }">
          {{ isLessonComplete ? '✓ Complete!' : `Press: ${targetKey.toUpperCase()}` }}
        </p>
        <p class="counter">Completed: {{ keyPressCount }} / {{ requiredPresses }}</p>
        <p v-if="isLessonComplete" class="success-message">
          Great job! You've completed the lesson!
        </p>
        <div v-if="isLessonComplete" class="button-container">
          <LessonNavigation 
            nextLessonKey="Next Lesson: Home Row"
            RandomSequence="Try Different Keys"
            :isMultiKeyLesson="true"
            @reset="resetLesson"
            @next="goToNextLesson"
            @random="tryRandomPair"
          />
        </div>
      </div>
  
      <KeyboardComponent 
        :activeKey="activeKey"
        :targetKey="targetKey"
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
    name: 'TopKeyLesson',
    components: {
      KeyboardComponent,
      LessonNavigation
    },
    mixins: [keyboardMixin],
    data() {
      return {
        keyPressCount: 0,
        isLessonComplete: false,
        requiredPresses: 50,
        activeKey: null,
        currentKeyIndex: 0,
        keySequence: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        isOriginalPair: true,
        topRowKeys: {
          left: ['q', 'w', 'e', 'r', 't'],
          right: ['y', 'u', 'i', 'o', 'p']
        }
      }
    },
    computed: {
      targetKey() {
        return this.keySequence[this.currentKeyIndex]
      }
    },
    methods: {
      handleLessonKeyPress(key) {
        if (this.isLessonComplete) return;
  
        if (key === this.targetKey) {
          this.activeKey = this.targetKey
          this.keyPressCount++
          
          setTimeout(() => {
            this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keySequence.length
            this.activeKey = null
            
            if (this.keyPressCount >= this.requiredPresses) {
              this.isLessonComplete = true
            }
          }, 100)
        } else {
          this.activeKey = key
          setTimeout(() => {
            this.activeKey = null
          }, 100)
        }
      },
      getRandomKey(array) {
        return array[Math.floor(Math.random() * array.length)]
      },
      tryRandomPair() {
        const allKeys = [...this.topRowKeys.left, ...this.topRowKeys.right]
        this.keySequence = allKeys.sort(() => Math.random() - 0.5)
        this.isOriginalPair = false
        this.resetLesson()
      },
      resetLesson() {
        this.keyPressCount = 0
        this.isLessonComplete = false
        this.activeKey = null
        this.currentKeyIndex = 0
      },
      goToNextLesson() {
        this.$router.push('/lessons/TRwordLesson')
      }
    }
  }
  </script>