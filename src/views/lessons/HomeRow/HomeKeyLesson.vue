<template>
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>{{ currentPairName }}</h2>
        <p class="instruction">
          {{ isLessonComplete 
            ? 'Lesson complete! Try another sequence or move to next lesson.' 
            : 'Practice pressing the home row keys in sequence.' 
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
            nextLessonKey="Next Lesson: Home Row Words"
            RandomSequence="Try Random Sequence"
            :isMultiKeyLesson="true"
            @reset="resetLesson"
            @next="goToNextLesson"
            @random="shuffleHomeRow"
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
    name: 'HomeKeyLesson',
    components: {
      KeyboardComponent,
      LessonNavigation
    },
    mixins: [keyboardMixin],
    data() {
      return {
        keyPressCount: 0,
        isLessonComplete: false,
        requiredPresses: 50, // 50 Increased for full home row
        activeKey: null,
        currentKeyIndex: 0,
        keySequence: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
        homeRowKeys: {
          left: ['a', 's', 'd', 'f', 'g'],
          right: ['h', 'j', 'k', 'l', ';']
        },
        currentPairName: 'Home Row Keys Practice'
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
      shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },
      shuffleHomeRow() {
        // Create a new array with all home row keys
        const allKeys = [...this.homeRowKeys.left, ...this.homeRowKeys.right];
        
        // Shuffle the array
        this.keySequence = this.shuffleArray([...allKeys]);
        
        // Update the lesson name to indicate random sequence
        this.currentPairName = 'Home Row Keys - Random Sequence';
        
        // Reset the lesson with new sequence
        this.resetLesson();
      },
      resetLesson() {
        this.keyPressCount = 0;
        this.isLessonComplete = false;
        this.activeKey = null;
        this.currentKeyIndex = 0;
      },
      goToNextLesson() {
        this.$router.push('/lessons/HRwordLesson')
      }
    }
  }
  </script> 