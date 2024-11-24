<template>
    <div class="typing-container">
      <!-- Keyboard layout -->
      <div class="keyboard">
        <!-- Number row -->
        <div class="keyboard-row">
          <div v-for="key in ['`','1','2','3','4','5','6','7','8','9','0','-','=']" 
               :key="key" 
               class="key faded">{{ key }}</div>
        </div>
        <!-- Top letter row -->
        <div class="keyboard-row">
          <div v-for="key in ['q','w','e','r','t','y','u','i','o','p','[',']','\\']" 
               :key="key"
               :class="[
                 'key',
                 {
                   'active-row': activeRow === 'top' || secondaryRow === 'top',
                   'faded': activeRow !== 'top' && secondaryRow !== 'top',
                   'active': activeKey === key && key === targetKey,
                   'incorrect': activeKey === key && key !== targetKey,
                   'highlight': key === targetKey && activeRow === 'top'
                 }
               ]"
          >{{ key.toUpperCase() }}</div>
        </div>
        <!-- Home row -->
        <div class="keyboard-row">
          <div v-for="key in ['a','s','d','f','g','h','j','k','l',';']" 
               :key="key"
               :class="[
                 'key',
                 {
                   'active-row': activeRow === 'home' || secondaryRow === 'home',
                   'faded': activeRow !== 'home' && secondaryRow !== 'home',
                   'active': activeKey === key && key === targetKey,
                   'incorrect': activeKey === key && key !== targetKey,
                   'highlight': key === targetKey && activeRow === 'home'
                 }
               ]"
          >{{ key.toUpperCase() }}</div>
        </div>
        <!-- Bottom row -->
        <div class="keyboard-row">
          <div v-for="key in ['z','x','c','v','b','n','m',',','.','/']" 
               :key="key"
               :class="[
                 'key',
                 {
                   'active-row': activeRow === 'bottom',
                   'faded': activeRow !== 'bottom',
                   'active': activeKey === key && key === targetKey,
                   'incorrect': activeKey === key && key !== targetKey,
                   'highlight': key === targetKey && activeRow === 'bottom'
                 }
               ]"
          >{{ key.toUpperCase() }}</div>
        </div>
        <!-- Space row -->
        <div class="keyboard-row">
          <div class="key wide faded">CTRL</div>
          <div class="key wide faded">OPT</div>
          <div class="key space faded">SPACE</div>
          <div class="key wide faded">OPT</div>
        </div>
      </div>
      
      <!-- Hands overlay -->
      <div class="hands-container">
        <div class="hand left-hand">
          <div finger="left-index" side="left" class="tb-hand">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 253.5" version="1.1">
              <g transform="translate(-0.00816057,-825.63816)">
                <g transform="matrix(-1.3738728,0,0,1.3738728,637.77308,5.0698826)">
                  <!-- Base hand path (always skin colored) -->
                  <path d="m396.6 598.3a10.5 10.5 0 0 0-10.5 10.5 10.5 10.5 0 0 0 0 0.1l0 66.6c0 1.9-1.6 3.5-3.5 3.5-1.9 0-3.5-1.6-3.5-3.5l0-52.6a10.5 10.5 0 0 0-10.5-10.5 10.5 10.5 0 0 0-10.5 10.5 10.5 10.5 0 0 0 0 0.1l0 87.6-14.2-19.4c-4.2-6.5-12.4-8.7-18.4-4.9-6 3.8-7.5 12.1-3.3 18.6 0 0 22.9 34.7 32.7 49.5 9.8 14.8 25.6 26.5 55.2 26.5 49 0 53.4-37.8 53.4-49.1 0-11.3 0-94.7 0-94.7a10.5 10.5 0 0 0-10.5-10.5 10.5 10.5 0 0 0-10.5 10.5l0 45.6c0 1.9-1.6 3.5-3.5 3.5-1.9 0-3.5-1.6-3.5-3.5l0-66.7a10.5 10.5 0 0 0-10.5-10.5 10.5 10.5 0 0 0-10.5 10.5l0 59.6c0 1.9-1.6 3.5-3.5 3.5-1.9 0-3.5-1.6-3.5-3.5l0-66.7a10.5 10.5 0 0 0-10.5-10.5z" 
                        class="hand-base"/>
                  <!-- Individual finger paths -->
                  <path class="finger" 
                        :class="{
                          'highlight': fingerMap[targetKey] === 'l-pinky',
                          'active-finger': activeKey === targetKey && fingerMap[targetKey] === 'l-pinky',
                          'incorrect-finger': activeKey && activeKey !== targetKey && fingerMap[activeKey] === 'l-pinky'
                        }"
                        d="m452.6 625.4c-6.4 0-11.5 5.2-11.5 11.5l0 0.1 0 52.9 23 0 0-53c0-6.4-5.2-11.5-11.5-11.5z"/>
                  <path class="finger" 
                        :class="{
                          'highlight': fingerMap[targetKey] === 'l-ring',
                          'active-finger': activeKey === targetKey && fingerMap[targetKey] === 'l-ring',
                          'incorrect-finger': activeKey && activeKey !== targetKey && fingerMap[activeKey] === 'l-ring'
                        }"
                        d="m424.6 604.5c-6.4 0-11.5 5.2-11.5 11.5l0 0.1 0 52.9 23 0 0-53c0-6.4-5.2-11.5-11.5-11.5z"/>
                  <path class="finger" 
                        :class="{
                          'highlight': fingerMap[targetKey] === 'l-middle',
                          'active-finger': activeKey === targetKey && fingerMap[targetKey] === 'l-middle',
                          'incorrect-finger': activeKey && activeKey !== targetKey && fingerMap[activeKey] === 'l-middle'
                        }"
                        d="m396.6 597.3c-6.4 0-11.5 5.2-11.5 11.5l0 0.1 0 52.9 23 0 0-53c0-6.4-5.2-11.5-11.5-11.5z"/>
                  <path class="finger" 
                        :class="{
                          'highlight': fingerMap[targetKey] === 'l-index',
                          'active-finger': activeKey === targetKey && fingerMap[targetKey] === 'l-index',
                          'incorrect-finger': activeKey && activeKey !== targetKey && fingerMap[activeKey] === 'l-index'
                        }"
                        d="m368.4 611.4c-6.4 0-11.5 5.2-11.5 11.5l0 0.1 0 52.9 23 0 0-53c0-6.4-5.2-11.5-11.5-11.5z"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div class="hand right-hand">
          <div side="right" class="tb-hand">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 253.5" version="1.1">
              <g transform="translate(-0.00816057,-825.63816)">
                <g transform="matrix(1.3738728,0,0,1.3738728,-437.77308,5.0698826)">
                  <!-- Base hand path (always skin colored) -->
                  <path d="m396.6 598.3a10.5 10.5 0 0 0-10.5 10.5 10.5 10.5 0 0 0 0 0.1l0 66.6c0 1.9-1.6 3.5-3.5 3.5-1.9 0-3.5-1.6-3.5-3.5l0-52.6a10.5 10.5 0 0 0-10.5-10.5 10.5 10.5 0 0 0-10.5 10.5 10.5 10.5 0 0 0 0 0.1l0 87.6-14.2-19.4c-4.2-6.5-12.4-8.7-18.4-4.9-6 3.8-7.5 12.1-3.3 18.6 0 0 22.9 34.7 32.7 49.5 9.8 14.8 25.6 26.5 55.2 26.5 49 0 53.4-37.8 53.4-49.1 0-11.3 0-94.7 0-94.7a10.5 10.5 0 0 0-10.5-10.5 10.5 10.5 0 0 0-10.5 10.5l0 45.6c0 1.9-1.6 3.5-3.5 3.5-1.9 0-3.5-1.6-3.5-3.5l0-66.7a10.5 10.5 0 0 0-10.5-10.5 10.5 10.5 0 0 0-10.5 10.5l0 59.6c0 1.9-1.6 3.5-3.5 3.5-1.9 0-3.5-1.6-3.5-3.5l0-66.7a10.5 10.5 0 0 0-10.5-10.5z" 
                        class="hand-base"/>
                  <!-- Individual finger paths -->
                  <path class="finger" 
                        :class="{
                          'highlight': fingerMap[targetKey] === 'r-pinky',
                          'active-finger': activeKey === targetKey && fingerMap[targetKey] === 'r-pinky',
                          'incorrect-finger': activeKey !== targetKey && fingerMap[activeKey] === 'r-pinky'
                        }"
                        d="m452.6 625.4c-6.4 0-11.5 5.2-11.5 11.5l0 0.1 0 52.9 23 0 0-53c0-6.4-5.2-11.5-11.5-11.5z"/>
                  <path class="finger" 
                        :class="{
                          'highlight': fingerMap[targetKey] === 'r-ring',
                          'active-finger': activeKey === targetKey && fingerMap[targetKey] === 'r-ring',
                          'incorrect-finger': activeKey !== targetKey && fingerMap[activeKey] === 'r-ring'
                        }"
                        d="m424.6 604.5c-6.4 0-11.5 5.2-11.5 11.5l0 0.1 0 52.9 23 0 0-53c0-6.4-5.2-11.5-11.5-11.5z"/>
                  <path class="finger" 
                        :class="{
                          'highlight': fingerMap[targetKey] === 'r-middle',
                          'active-finger': activeKey === targetKey && fingerMap[targetKey] === 'r-middle',
                          'incorrect-finger': activeKey !== targetKey && fingerMap[activeKey] === 'r-middle'
                        }"
                        d="m396.6 597.3c-6.4 0-11.5 5.2-11.5 11.5l0 0.1 0 52.9 23 0 0-53c0-6.4-5.2-11.5-11.5-11.5z"/>
                  <path class="finger" 
                        :class="{
                          'highlight': fingerMap[targetKey] === 'r-index',
                          'active-finger': activeKey === targetKey && fingerMap[targetKey] === 'r-index',
                          'incorrect-finger': activeKey !== targetKey && fingerMap[activeKey] === 'r-index'
                        }"
                        d="m368.4 611.4c-6.4 0-11.5 5.2-11.5 11.5l0 0.1 0 52.9 23 0 0-53c0-6.4-5.2-11.5-11.5-11.5z"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'KeyboardComponent',
    props: {
      activeKey: String,
      targetKey: {
        type: String,
        required: true
      },
      activeFingers: Set,
      incorrectFingers: Set,
      activeRow: {
        type: String,
        default: 'home',
        validator: function(value) {
          return ['home', 'top', 'bottom'].indexOf(value) !== -1
        }
      },
      secondaryRow: {
        type: String,
        default: null,
        validator: function(value) {
          return ['home', 'top', 'bottom', null].indexOf(value) !== -1
        }
      }
    },
    data() {
      return {
        fingerMap: {
          'a': 'l-pinky',
          's': 'l-ring',
          'd': 'l-middle',
          'f': 'l-index',
          'g': 'l-index',
          'h': 'r-index',
          'j': 'r-index',
          'k': 'r-middle',
          'l': 'r-ring',
          ';': 'r-pinky',
          'q': 'l-pinky',
          'w': 'l-ring',
          'e': 'l-middle',
          'r': 'l-index',
          't': 'l-index',
          'y': 'r-index',
          'u': 'r-index',
          'i': 'r-middle',
          'o': 'r-ring',
          'p': 'r-pinky',
          '[': 'r-pinky',
          ']': 'r-pinky',
          '\\': 'r-pinky',
          'z': 'l-pinky',
          'x': 'l-ring',
          'c': 'l-middle',
          'v': 'l-index',
          'b': 'l-index',
          'n': 'r-index',
          'm': 'r-index',
          ',': 'r-middle',
          '.': 'r-ring',
          '/': 'r-pinky'
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Copy all keyboard and hands-related styles from Home.vue */
  .typing-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 800px;
  padding: 0 100px;
}

.hands-container {
  position: absolute;
  top: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

.hand {
  position: relative;
  width: 200px;
}

.palm {
  width: 160px;
  height: 120px;
  background: #ffdbac;
  border-radius: 30px;
  position: relative;
  transform: skew(-10deg);
}

.fingers {
  display: flex;
  gap: 8px;
  position: absolute;
  top: -80px;
}

.finger {
  width: 28px;
  height: 90px;
  background: #ffdbac;
  border-radius: 14px;
  position: relative;
  transform-origin: bottom center;
  transition: fill 0.2s ease-out;
}

.thumb {
  width: 32px;
  height: 60px;
  background: #ffdbac;
  border-radius: 16px;
  position: absolute;
  transform: rotate(45deg);
  left: -20px;
  top: 40px;
}

.left-hand {
  position: absolute;
  left: 50px;
  transform: translateX(0);
}

.right-hand {
  position: absolute;
  right: 200px;
  transform: translateX(0);
}

.finger.active {
  background: #ffc107;
  transform: translateY(-5px);
  filter: brightness(1.1);
}

/* Finger heights */
.pinky { height: 75px; }
.ring { height: 85px; }
.middle { height: 90px; }
.index { height: 85px; }

/* Skin tone variations */
.skin-tone-1 { background: #ffdbac; }
.skin-tone-2 { background: #f1c27d; }
.skin-tone-3 { background: #e0ac69; }
.skin-tone-4 { background: #c68642; }
.skin-tone-5 { background: #8d5524; }

/* Add subtle shadows and depth */
.finger::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  box-shadow: inset -2px -2px 4px rgba(0,0,0,0.1),
              inset 2px 2px 4px rgba(255,255,255,0.1);
}

.palm::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  box-shadow: inset -4px -4px 8px rgba(0,0,0,0.1),
              inset 4px 4px 8px rgba(255,255,255,0.1);
}

.keyboard {
  position: relative;
  z-index: 2;
  margin-bottom: 300px;
}

.key.home {
  position: relative;
  z-index: 3; /* Ensure home row keys are above hands */
  background: rgba(41, 128, 185, 0.8);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.key.faded {
  opacity: 0.2;
}

.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 4px;
}

.key {
  width: 40px;
  height: 40px;
  background: #e0e0e0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight:bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.key.active {
  background-color: #4CAF50 !important; /* Green for correct key */
  color: white;
  transform: scale(0.95);
}

.key.incorrect {
  background-color: #f44336 !important; /* Red for incorrect key */
  color: white;
  transform: scale(0.95);
}

.home {
  background-color: #e0e0e0;
}

.faded {
  opacity: 0.5;
}

/* Special key widths */
.key.wide {
  width: 80px;
}

.key.wide-tab {
  width: 60px;
}

.key.wide-caps {
  width: 70px;
}

.key.wide-shift {
  width: 90px;
}

.key.wide-enter {
  width: 85px;
}

.key.space {
  width: 240px;
  background: rgba(41, 128, 185, 0.8);  /* Match home row style */
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.key.space.active {
  background: #27ae60;
  transform: translateY(2px);
  box-shadow: 0 0 4px rgba(39, 174, 96, 0.4);
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  user-select: none;
}

.tb-hand {
  width: 200px;
  height: 253.5px;
  position: relative;
}

.hand-path {
  fill: #ffdbac;
  stroke: #ccc;
  stroke-width: 2;
  transition: fill 0.2s ease-out;
}

.finger {
  fill: #ffdbac;
  transition: fill 0.2s ease;
}

.highlight {
  fill: #4CAF50;
  filter: drop-shadow(0 0 3px rgba(76, 175, 80, 0.5));
}

.active-finger {
  fill: #4CAF50 !important;
}

.incorrect-finger {
  fill: #f44336 !important;
}

.hand-base {
  fill: #ffdbac;
}

.key.active-row {
  opacity: 1;
  background: rgba(41, 128, 185, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.2);
  font-weight: bold;
  font-size: 20px;
}

.key.faded {
  opacity: 0.2;
  background: rgba(41, 128, 185, 0.3);
}

.key.highlight {
  background-color: rgba(41, 128, 185, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-weight: bold;
}

.key.active-row {
  opacity: 1;
}

.key.active {
  background-color: #4CAF50;
  color: white;
  transform: scale(0.95);
}

.key.incorrect {
  background-color: #e74c3c;
  color: white;
}
  </style>