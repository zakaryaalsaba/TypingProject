<template>
    <div class="m-key-lesson">
      <div class="lesson-container">
        <div class="lesson-text">
          <h2>Bottom Row: The m Key</h2>
          <p class="instruction">
            {{ isLessonComplete 
              ? 'Lesson complete! Choose your next step.' 
              : 'Press the m key with your right index finger'
            }}
          </p>
          <p class="finger-movement-tip">
            <span class="movement-arrow">↓</span> 
            Move right index finger down from home position (j) to m
          </p>
          <p class="target-key" :class="{ 'completed': isLessonComplete }">
            {{ isLessonComplete ? '✓ Complete!' : 'Press: m' }}
          </p>
          <p class="counter">Completed: {{ keyPressCount }} / 10</p>
          <p v-if="isLessonComplete" class="success-message">
            Great job! You've completed the lesson!
          </p>
          <div v-if="isLessonComplete" class="button-container">
            <LessonNavigation 
            nextLessonKey="Next Lesson: , Key"
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
        activeRow="bottom"
      />
    </div>
  </template>
  
  <script>
  import { keyboardMixin } from '../../../mixins/keyboardMixin'
  import KeyboardComponent from '../../../components/KeyboardComponent.vue'
  import LessonNavigation from '../../../components/LessonNavigation.vue'
  import '@/assets/styles/lessonStyles.css'
  
  export default {
    name: 'MKeyLesson',
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
        targetKey: 'm',
        activeFingers: new Set(),
        incorrectFingers: new Set()
      }
    },
    methods: {
      handleLessonKeyPress(key) {
        if (this.isLessonComplete) return;
  
        this.activeKey = key;
  
        if (key === 'm') {
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
        this.targetKey = 'm';
        this.activeFingers.clear();
        this.incorrectFingers.clear();
      },
      goToNextLesson() {
        this.$router.push('/lessons/CommaKeyLesson');
      }
    }
  }
  </script>