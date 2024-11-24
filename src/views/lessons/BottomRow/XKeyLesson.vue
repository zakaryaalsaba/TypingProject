<template>
  <div class="x-key-lesson">
    <div class="lesson-container">
      <div class="lesson-text">
        <h2>Bottom Row: The x Key</h2>
        <p class="instruction">
          {{ isLessonComplete 
            ? 'Lesson complete! Choose your next step.' 
            : 'Press the x key with your left ring finger'
          }}
        </p>
        <p class="finger-movement-tip">
          <span class="movement-arrow">↓</span> 
          Move left ring finger down from home position (s) to x
        </p>
        <p class="target-key" :class="{ 'completed': isLessonComplete }">
          {{ isLessonComplete ? '✓ Complete!' : 'Press: x' }}
        </p>
        <p class="counter">Completed: {{ keyPressCount }} / 10</p>
        <p v-if="isLessonComplete" class="success-message">
          Great job! You've completed the lesson!
        </p>
        <div v-if="isLessonComplete" class="button-container">
          <LessonNavigation 
          nextLessonKey="Next Lesson: z Key"
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
  name: 'XKeyLesson',
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
      targetKey: 'x',
      activeFingers: new Set(),
      incorrectFingers: new Set()
    }
  },
  methods: {
    handleLessonKeyPress(key) {
      if (this.isLessonComplete) return;

      this.activeKey = key;

      if (key === 'x') {
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
      this.targetKey = 'x';
      this.activeFingers.clear();
      this.incorrectFingers.clear();
    },
    goToNextLesson() {
      this.$router.push('/lessons/zKeyLesson');
    }
  }
}
</script>