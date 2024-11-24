<template>
    <div class="r-key-lesson">
      <div class="lesson-container">
        <div class="lesson-text">
          <h2>Top Row: The r Key</h2>
          <p class="instruction">
            {{ isLessonComplete 
              ? 'Lesson complete! Choose your next step.' 
              : 'Press the r key with your left index finger'
            }}
          </p>
          <p class="finger-movement-tip">
            <span class="movement-arrow">↑</span> 
            Move left index finger up from home position (f) to r
          </p>
          <p class="target-key" :class="{ 'completed': isLessonComplete }">
            {{ isLessonComplete ? '✓ Complete!' : 'Press: r' }}
          </p>
          <p class="counter">Completed: {{ keyPressCount }} / 10</p>
          <p v-if="isLessonComplete" class="success-message">
            Great job! You've completed the lesson!
          </p>
          <div v-if="isLessonComplete" class="button-container">
            <LessonNavigation 
            nextLessonKey="Next Lesson: e Key"
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
        activeRow="top"
      />
    </div>
  </template>
  
  <script>
  import { keyboardMixin } from '../../../mixins/keyboardMixin'
  import KeyboardComponent from '../../../components/KeyboardComponent.vue'
  import LessonNavigation from '../../../components/LessonNavigation.vue'
  import '@/assets/styles/lessonStyles.css'
  
  export default {
    name: 'RKeyLesson',
    components: {
      KeyboardComponent,
      LessonNavigation
    },
    mixins: [keyboardMixin],
    data() {
      return {
        keyPressCount: 0,
        isLessonComplete: false,
        activeKey: null,
        targetKey: 'r',
        activeFingers: new Set(),
        incorrectFingers: new Set()
      }
    },
    methods: {
      handleLessonKeyPress(key) {
        if (this.isLessonComplete) return;
  
        this.activeKey = key;
  
        if (key === 'r') {
          this.keyPressCount++;
          
          if (this.keyPressCount >= 10) {
            this.isLessonComplete = true;
          }
        }
  
        setTimeout(() => {
          this.activeKey = null;
        }, 100);
      },
      resetLesson() {
        this.keyPressCount = 0;
        this.isLessonComplete = false;
        this.activeKey = null;
        this.targetKey = 'r';
        this.activeFingers.clear();
        this.incorrectFingers.clear();
      },
      goToNextLesson() {
        this.$router.push('/lessons/EKeyLesson');
      }
    }
  }
  </script>