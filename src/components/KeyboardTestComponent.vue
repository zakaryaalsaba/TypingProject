<template>
    <div class="keyboard">
      <div v-for="(row, rowIndex) in keyboardLayout" 
           :key="rowIndex" 
           class="keyboard-row"
      >
        <div v-for="(key, keyIndex) in row" 
             :key="keyIndex"
             class="key"
             :class="{
               'active': key.toLowerCase() === activeKey?.toLowerCase(),
               'target': key.toLowerCase() === targetKey?.toLowerCase()
             }"
        >
          {{ key }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'KeyboardTestComponent',
    props: {
      activeKey: String,
      targetKey: String
    },
    data() {
      return {
        keyboardLayout: [
          ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
          ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
          ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
          ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
          ['Space']
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .keyboard {
    width: 100%;
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .keyboard-row {
    display: flex;
    justify-content: center;
    margin: 5px 0;
  }
  
  .key {
    width: 40px;
    height: 40px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    user-select: none;
    box-shadow: 0 2px 2px rgba(0,0,0,0.1);
  }
  
  .key.active {
    background-color: #2196F3;
    color: white;
    border-color: #1976D2;
  }
  
  .key.target {
    background-color: #4CAF50;
    color: white;
    border-color: #388E3C;
  }
  
  /* Special keys */
  .key:first-child { margin-left: 0; }
  .key:last-child { margin-right: 0; }
  
  .keyboard-row:last-child .key {
    width: 300px; /* Space bar */
  }
  
  /* Wider keys */
  .keyboard-row:nth-child(1) .key:first-child { width: 40px; } /* ` key */
  .keyboard-row:nth-child(2) .key:first-child { width: 60px; } /* Tab key */
  .keyboard-row:nth-child(3) .key:first-child { width: 70px; } /* Caps key */
  .keyboard-row:nth-child(3) .key:last-child { width: 70px; } /* Enter key */
  .keyboard-row:nth-child(4) .key:first-child { width: 90px; } /* Left Shift */
  .keyboard-row:nth-child(4) .key:last-child { width: 90px; } /* Right Shift */
  </style>