# Domain Analysis

## Constant Information



* **styling**
  * green: #00A74A
  * red: #9F0F17
  * yellow: #CCA707
  * blue: #094A8F
  * lightening: 30%
  * body-background-color: #222
  * game-background-color: #444
  * highlight-color: #bbb
* **logic**
  * Sounds
    * green
    * red
    * yellow
    * blue
    * wrong-answer
  * winning-stage: 20
  * winning-text: "YOU WIN!"
  * wrong-button-text: "WRONG!!!"
  * light-up-timeouts
    * 1-4: 1000
    * 5-8: 750
    * 9-12: 500
    * 13-20: 250

## Changing Information

* currentStage: Number
* buttonSeries: Array of button presses
* toTest: current index of buttonSeries to press
* isStrict: Boolean (true if in strict mode)

## DOM Events

* click on colored buttons
* click on start button
* change on strict mode toggle
