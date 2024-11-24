<template>
  <div class="button-group">
    <div v-if="isMultiKeyLesson" class="random-practice-wrapper">
      <button 
        @click="$emit('random')" 
        class="random-practice-btn"
      >
         {{ RandomSequence }}
      </button>
      <div class="keyboard-hint">
        <small>
          ⭐ Mix it up for better practice
        </small>
      </div>
    </div>
    <div class="try-again-wrapper">
      <button 
        @click="$emit('reset')" 
        class="try-again-btn"
      >
        Try again
      </button>
      <div class="keyboard-hint">
        <small>
          🎯 Perfect your technique with 5+ rounds
        </small>
      </div>
    </div>

    <div class="next-lesson-wrapper">
      <button 
        @click="$emit('next')" 
        class="next-lesson-btn"
        autofocus
      >
      {{ nextLessonKey }}
      </button>
      <div class="keyboard-hint">
        <small>Press <kbd>Enter ↵</kbd> to continue</small>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: 'LessonNavigation',
    props: {
    RandomSequence: {
        type: String
      },
      nextLessonKey: {
        type: String,
        required: true
      },
      isMultiKeyLesson: {
        type: Boolean,
        default: false
      }
    },
    emits: ['reset', 'next', 'random']
  }
  </script>
  
  <style scoped>
  .random-practice-btn {
    padding: 0.5rem 1rem;
    background-color: #9c27b0;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .random-practice-btn:hover {
    background-color: #7b1fa2;
  }
  
  .random-practice-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .keyboard-hint {
    margin-top: 8px;
    color: #666;
  }
  
  .keyboard-hint small {
    font-size: 12px;
  }
  </style>