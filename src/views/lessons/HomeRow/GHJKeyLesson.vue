<template>
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>{{ currentPairName }}</h2>
        <p class="instruction">
          {{ isLessonComplete 
            ? 'Lesson complete! Try another combination or move to next lesson.' 
            : `Practice pressing the ${keySequence[0].toUpperCase()}, ${keySequence[1].toUpperCase()}, and ${keySequence[2].toUpperCase()} keys in sequence.` 
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
            nextLessonKey="Next Lesson: Home Row"
            RandomSequence="Try 3 Different Keys"
            :isMultiKeyLesson="true"
            @reset="resetLesson"
            @next="goToNextLesson"
            @random="tryRandomTrio"
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
    name: 'GHJKeyLesson',
    components: {
      KeyboardComponent,
      LessonNavigation
    },
    mixins: [keyboardMixin],
    data() {
      return {
        keyPressCount: 0,
        isLessonComplete: false,
        requiredPresses: 30, // Increased for 3 keys
        activeKey: null,
        currentKeyIndex: 0,
        keySequence: ['g', 'h', 'j'],
        homeRowKeys: {
          left: ['a', 's', 'd', 'f', 'g'],
          right: ['h', 'j', 'k', 'l', ';']
        },
        currentPairName: 'G, H, and J Keys Practice'
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
      tryRandomTrio() {
        // Get two random keys from left hand and one from right hand
        const leftKey1 = this.getRandomKey(this.homeRowKeys.left)
        let leftKey2
        do {
          leftKey2 = this.getRandomKey(this.homeRowKeys.left)
        } while (leftKey2 === leftKey1) // Ensure different keys
        
        const rightKey = this.getRandomKey(this.homeRowKeys.right)
        
        // Update key sequence and name
        this.keySequence = [leftKey1, leftKey2, rightKey]
        this.currentPairName = `${leftKey1.toUpperCase()}, ${leftKey2.toUpperCase()}, and ${rightKey.toUpperCase()} Keys Practice`
        
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
        this.$router.push('/lessons/HomeKeyLesson')
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