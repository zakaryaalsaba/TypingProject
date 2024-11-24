export const keyboardMixin = {
    data() {
        return {
            activeKey: null,
            showIncorrectKey: null,
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
                ' ': 'space'
            },
            activeFingers: new Set(),
            incorrectFingers: new Set()
        }
    },
    methods: {
        handleKeyPress(event) {
            // Don't process keys if lesson is complete
            if (this.isLessonComplete) {
                if (event.key === 'Enter' || event.key === ' ') {
                    this.goToNextLesson()
                }
                return
            }

            const key = event.key.toLowerCase()
            this.activeKey = key

            // Clear previous states
            this.activeFingers.clear()
            this.incorrectFingers.clear()
            this.showIncorrectKey = null

            console.log('key key = ' + key)
            if (this.fingerMap[key]) {
                this.activeFingers.add(this.fingerMap[key])
            }

            // Add lesson-specific key handling logic in components
            if (this.handleLessonKeyPress) {
                this.handleLessonKeyPress(key)
            }
        },
        handleKeyUp() {
            this.activeKey = null
            this.activeFingers.clear()
            this.incorrectFingers.clear()
            this.showIncorrectKey = null
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyPress)
        window.addEventListener('keyup', this.handleKeyUp)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress)
        window.removeEventListener('keyup', this.handleKeyUp)
    }
}