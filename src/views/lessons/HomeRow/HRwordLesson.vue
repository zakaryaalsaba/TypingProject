<template>
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>Home Row Words Practice</h2>
        <p class="instruction">
          {{ isLessonComplete 
            ? 'Lesson complete! Try different words or move to next lesson.' 
            : `Type the word: ${currentWord}` 
          }}
        </p>
        <p class="target-key" :class="{ 'completed': isLessonComplete }">
          {{ isLessonComplete ? '✓ Complete!' : `Next key: ${targetKey}` }}
        </p>
        <p class="word-display">
          <span 
            v-for="(letter, index) in currentWord" 
            :key="index"
            :class="{
              'completed': index < currentKeyIndex,
              'current': index === currentKeyIndex
            }"
          >
            {{ letter }}
          </span>
        </p>
        <p class="counter">Words: {{ wordsCompleted }} / {{ requiredWords }}</p>
        <p v-if="isLessonComplete" class="success-message">
          Great job! You've completed the lesson!
        </p>
        <div v-if="isLessonComplete" class="button-container">
          <LessonNavigation 
            nextLessonKey="Next: Ready to Take Home Row Test"
            RandomSequence="Try New Words"
            :isMultiKeyLesson="true"
            @reset="resetLesson"
            @next="goToNextLesson"
            @random="tryNewWords"
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
    name: 'HRwordLesson',
    components: {
      KeyboardComponent,
      LessonNavigation
    },
    mixins: [keyboardMixin],
    data() {
      return {
        wordsCompleted: 0,
        isLessonComplete: false,
        requiredWords: 10,
        activeKey: null,
        currentKeyIndex: 0,
        homeRowKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        // List of words using only home row letters
        homeRowWords: [
          'sad',
          'flag',
          'half',
          'flash',
          'glad',
          'slag',
          'dash',
          'lad',
          'had',
          'fall',
          'hall',
          'glass',
          'salad',
          'flask',
          'shall',
          'lash',
          'dash',
          'fad',
          'has',
          'ash'
        ],
        currentWord: '',
        wordQueue: []
      }
    },
    computed: {
      targetKey() {
        return this.currentWord[this.currentKeyIndex] || ''
      }
    },
    created() {
      this.initializeWordQueue()
    },
    methods: {
      initializeWordQueue() {
        // Shuffle the words array and create a queue
        this.wordQueue = this.shuffleArray([...this.homeRowWords])
        this.currentWord = this.wordQueue[0]
      },
      shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },
      handleLessonKeyPress(key) {
        if (this.isLessonComplete) return;
  
        if (key === this.targetKey) {
          this.activeKey = this.targetKey
          
          setTimeout(() => {
            this.currentKeyIndex++
            this.activeKey = null
            
            // Check if word is completed
            if (this.currentKeyIndex >= this.currentWord.length) {
              this.wordsCompleted++
              
              if (this.wordsCompleted >= this.requiredWords) {
                this.isLessonComplete = true
              } else {
                // Move to next word
                this.currentWord = this.wordQueue[this.wordsCompleted]
                this.currentKeyIndex = 0
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
      tryNewWords() {
        this.initializeWordQueue()
        this.resetLesson()
      },
      resetLesson() {
        this.wordsCompleted = 0
        this.isLessonComplete = false
        this.activeKey = null
        this.currentKeyIndex = 0
        this.currentWord = this.wordQueue[0]
      },
      goToNextLesson() {
        this.$router.push('/tests/HomeRowTest')
      }
    }
  }
  </script>
  
  <style scoped>
  .word-display {
    font-size: 2rem;
    margin: 1rem 0;
    font-family: monospace;
    letter-spacing: 2px;
  }
  
  .word-display span {
    padding: 0 4px;
  }
  
  .word-display span.completed {
    color: #4CAF50;
  }
  
  .word-display span.current {
    color: #2196F3;
    border-bottom: 2px solid #2196F3;
  }
  
  .lesson-text {
    margin-bottom: 2rem;
  }
  </style>