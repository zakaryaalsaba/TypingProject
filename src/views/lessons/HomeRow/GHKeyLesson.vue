<template>
  <div class="lesson-container">
    <div class="lesson-text">
      <h2>{{ currentPairName }}</h2>
      <p class="instruction">
        {{ isLessonComplete 
          ? 'Lesson complete! Try another pair or move to next lesson.' 
          : `Practice pressing the ${keySequence[0].toUpperCase()} and ${keySequence[1].toUpperCase()} keys alternately.` 
        }}
      </p>
      <p class="target-key" :class="{ 'completed': isLessonComplete }">
        {{ isLessonComplete ? '✓ Complete!' : `Press: ${targetKey}` }}
      </p>
      <p class="counter">Presses: {{ keyPressCount }} / {{ requiredPresses }}</p>
      <p v-if="isLessonComplete" class="success-message">
        Great job! You've completed the lesson!
      </p>
      <div v-if="isLessonComplete" class="button-container">
        <LessonNavigation 
            nextLessonKey="Next Lesson: g, h, & j Keys"
            RandomSequence="Try 2 Different Keys"
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
  name: 'GHKeyLesson',
  components: {
    KeyboardComponent,
    LessonNavigation
  },
  mixins: [keyboardMixin],
  data() {
    return {
      keyPressCount: 0,
      isLessonComplete: false,
      requiredPresses: 20,
      activeKey: null,
      currentKeyIndex: 0,
      keySequence: ['g', 'h'],
      homeRowKeys: {
        left: ['a', 's', 'd', 'f', 'g'],
        right: ['h', 'j', 'k', 'l', ';']
      },
      currentPairName: 'G and H Keys Practice'
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
      // Get random keys from left and right hands
      const leftKey = this.getRandomKey(this.homeRowKeys.left)
      const rightKey = this.getRandomKey(this.homeRowKeys.right)
      
      // Update key sequence and name
      this.keySequence = [leftKey, rightKey]
      this.currentPairName = `${leftKey.toUpperCase()} and ${rightKey.toUpperCase()} Keys Practice`
      
      // Reset the lesson with new keys
      this.resetLesson()
    },
    resetLesson() {
      this.keyPressCount = 0
      this.isLessonComplete = false
      this.activeKey = null
      this.currentKeyIndex = 0
    },
    goToNextLesson() {
      this.$router.push('/lessons/GHJKeyLesson')
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

.random-pair-btn {
  padding: 0.5rem 1rem;
  background-color: #9c27b0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.random-pair-btn:hover {
  background-color: #7b1fa2;
}
</style>