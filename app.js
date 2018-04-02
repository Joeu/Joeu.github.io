new Vue({
  el: "#app",
  data: {
    options: {
      rock: {value: "rock", beats: "scissors"},
      paper: {value: "paper", beats: "rock"},
      scissors: {value: "scissors", beats: "paper"}
    },
    playerChoice: null,
    cpuChoice: null,
    gameRunning: false,
    optSelected: false,
    playerScore: 0,
    cpuScore: 0,
    bestOf: 1,
    round: 0,
    log: []
  },
  methods: {
    startGame(){
      this._resetValues();
      this.gameRunning = true;
    },
    setSelected(selection){
      this.optSelected = true;
      this.playerChoice = selection;
      this.cpuChoice = this._setCpuChoice();
    },
    jankenpon(){
      if (this.playerChoice.beats === this.cpuChoice.value){
        this.round++;
        this.log.unshift({
          class: "alert alert-info", 
          text: "Round #" + this.round + " - Player choice: " + this.playerChoice.value + " / CPU choice: " + this.cpuChoice.value + " || PLAYER BEATS CPU"
        });
        
        this.playerScore++;
      } else {
        if (this.playerChoice.value === this.cpuChoice.value){
          this.log.unshift({
            class: "alert alert-warning", 
            text: "DRAW ROUND" + this.round + " - Player choice: " + this.playerChoice.value + " / CPU choice: " + this.cpuChoice.value + " || DRAW"
          });
        } else {
          this.round++;
          this.log.unshift({
            class: "alert alert-danger", 
            text: "Round #" + this.round + " - Player choice: " + this.playerChoice.value + " / CPU choice: " + this.cpuChoice.value + " || CPU BEATS PLAYER"
          });
          this.cpuScore++;
        }
      }
      this.optSelected = false;
    },
    _setCpuChoice(){
      var keys = Object.keys(this.options);
      return this.options[keys[keys.length * Math.random() << 0]];
    },
    restartGame(){
      this.gameRunning = false;
      this._resetValues();
    },
    _resetValues(){
      this.playerChoice = null,
      this.cpuChoice = null,
      this.optSelected = false;
      this.playerScore = 0;
      this.cpuScore = 0;
      this.round = 0;
      this.log = [];
    }
  },
  watch: {
    playerScore: function(val){
      let vm = this;
      if (vm.bestOf / val < 2){
        vm.log.unshift({class: "alert alert-info", text: "PLAYER WON!"});
        vm.gameRunning = false;
      }
    },
    cpuScore: function(val){
      let vm = this;
      if (vm.bestOf / val < 2){
        vm.log.unshift({class: "alert alert-danger", text: "CPU WON!"});
        vm.gameRunning = false;
      }
    }
  }
});