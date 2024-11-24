<template>
  <div class="u-key-lesson">
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>Top Row: The u Key</h2>
        <p class="instruction">
          {{ isLessonComplete 
            ? 'Lesson complete! Choose your next step.' 
            : 'Press the u key with your left pinky finger'
          }}
        </p>
        <p class="finger-movement-tip">
          <span class="movement-arrow">↑</span> 
          Move right index finger up from home position (j) to u
        </p>
        <p class="target-key" :class="{ 'completed': isLessonComplete }">
          {{ isLessonComplete ? '✓ Complete!' : 'Press: u' }}
        </p>
        <p class="counter">Completed: {{ keyPressCount }} / 10</p>
        <p v-if="isLessonComplete" class="success-message">
          Great job! You've completed the lesson!
        </p>
        <div v-if="isLessonComplete" class="button-container">
          <LessonNavigation 
          nextLessonKey="Next Lesson: y Key"
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
  name: 'QKeyLesson',
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
      targetKey: 'u',
      activeFingers: new Set(),
      incorrectFingers: new Set()
    }
  },
  methods: {
    handleLessonKeyPress(key) {
      if (this.isLessonComplete) return;

      this.activeKey = key;

      if (key === 'u') {
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
      this.targetKey = 'u';
      this.activeFingers.clear();
      this.incorrectFingers.clear();
    },
    goToNextLesson() {
      this.$router.push('/lessons/YKeyLesson');
    }
  }
}
</script>