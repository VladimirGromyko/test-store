<template>
  <div class="header">
    <span>Обновление через:</span>
    <span style="width: 60px">{{ time }}</span>
    <span @click="$emit('onRunFunction')">
      <el-icon style="vertical-align: middle">
        <Update style="color: #409eff"/>
      </el-icon>
    </span>
  </div>
</template>

<script>

import Update from "../assets/update.svg";

export default {
  name: "Timer",
  components: { Update },
  data() {
    return {
      timerValue: 15,
      time: "15:000",
      intervalId: null,
    }
  },
  mounted() {
    /**
     * При первоначальной загрузке вызываем таймер обратного отсчета
     */
    this.startTimer(this.timerValue)
  },
  methods: {
    /**
     * startTimer - функция для запуска таймера обратного отсчета
     * @param startValue - входным параметром принимает число в секундах, как начало отсчета
     * по окончанию работы запускает функцию restartTimer для повторного запуска таймера
     */
    startTimer(startValue) {
      let countDownDate = new Date().getTime() + startValue*1000;
      this.intervalId = setInterval(() => {
        let now = new Date().getTime();
        let distance = countDownDate - now;

        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let milliseconds = distance % 1000;

        seconds = seconds < 10 ? "0" + seconds : seconds;
        milliseconds =
            milliseconds < 10
                ? "00" + milliseconds
                : milliseconds < 100
                    ? "0" + milliseconds
                    : milliseconds;

        this.time = `${seconds}:${milliseconds}`;

        if (distance <= 0) {
          clearInterval(this.intervalId);
          this.time = "00:000";
          this.restartTimer()
        }
      }, 1);
    },
    /**
     * restartTimer() - функция для повторного запуска таймера.
     * Делает небольшую задержку - 300мс для большей наглядности перезапуска.
     * А затем повторно запускает таймер и одновременно вызывает функцию обновления данных (эмитит событие
     * для обновления данных в родительскую компоненту)
     */
    restartTimer() {
      setTimeout(() => {
        this.time = `${this.timerValue}:000`;
        this.startTimer(this.timerValue);
        this.$emit('onRunFunction')
      }, 300)
    }
  }
}
</script>

<style scoped>
.header{
  padding: 20px 10px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
