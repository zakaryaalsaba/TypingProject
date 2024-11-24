<template>
  <div class="lesson-container">
    <div class="lesson-text">
      <h2>Bottom Row: V, B and N Keys</h2>
      <p class="instruction">
        {{ isLessonComplete 
          ? 'Lesson complete! Choose your next step.' 
          : `Practice pressing the ${keySequence[0].toUpperCase()}, ${keySequence[1].toUpperCase()} and ${keySequence[2].toUpperCase()} keys in sequence` 
        }}
      </p>
      <p class="finger-movement-tip">
        <span class="movement-arrow">↓</span> 
        {{ isOriginalPair 
          ? 'Move index fingers down from home positions (f, j) to reach v, b and n'
          : 'Practice reaching from home row position to bottom row keys'
        }}
      </p>
      <p class="target-key" :class="{ 'completed': isLessonComplete }">
        {{ isLessonComplete ? '✓ Complete!' : `Press: ${targetKey.toUpperCase()}` }}
      </p>
      <p class="counter">Presses: {{ keyPressCount }} / {{ requiredPresses }}</p>
      <p v-if="isLessonComplete" class="success-message">
        Great job! You've completed the lesson!
      </p>
      <div v-if="isLessonComplete" class="button-container">
        <LessonNavigation 
          nextLessonKey="Next Lesson: BNM"
          RandomSequence="Try 3 Different Keys"
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
      activeRow="bottom"
    />
  </div>
</template>

<script>
import { keyboardMixin } from '@/mixins/keyboardMixin'
import KeyboardComponent from '@/components/KeyboardComponent.vue'
import LessonNavigation from '@/components/LessonNavigation.vue'
import '@/assets/styles/lessonStyles.css'

export default {
  name: 'VBNKeyLesson',
  components: {
    KeyboardComponent,
    LessonNavigation
  },
  mixins: [keyboardMixin],
  data() {
    return {
      keyPressCount: 0,
      errorCount: 0,
      isLessonComplete: false,
      requiredPresses: 6,
      activeKey: null,
      currentKeyIndex: 0,
      keySequence: ['v', 'b', 'n'],
      isOriginalPair: true,
      bottomRowKeys: {
        left: ['z', 'x', 'c', 'v', 'b'],
        right: ['n', 'm', ',', '.', '/']
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
      const leftKey = this.getRandomKey(this.bottomRowKeys.left)
      const middleKey = this.getRandomKey(this.bottomRowKeys.left)
      const rightKey = this.getRandomKey(this.bottomRowKeys.right)
      this.keySequence = [leftKey, middleKey, rightKey]
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
      this.$router.push('/lessons/BRwordLesson')
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