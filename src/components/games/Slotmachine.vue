<template>
  <div class="py-3 md:py-16">
    <div
      class="text-3xl md:text-3xl font-bold text-center text-white uppercase"
    >
      <h1>win <u>77 free spins</u></h1>
      <h1>and up to</h1>
      <h1><u>€200 welcome bonus</u></h1>
    </div>

    <div class="text-center text-white h-10">
      <p v-show="times_spinned >= 2">
        <span class="text-green-500 font-bold">&check;</span> 77 FREE SPINS!
      </p>
      <p v-show="times_spinned >= 3">
        <span class="text-green-500 font-bold">&check;</span> €200 WELCOME
        BONUS!
      </p>
    </div>

    <div class="slotmachine py-5 max-w-sm mx-auto">
      <div class="px-8">
        <div class="bg-slot px-2 pt-2 rounded-t-xl">
          <div class="bg-gray-900 justify-end p-2 py-3 rounded-t-md">
            <h1 class="text-4xl font-bold text-center text-white mb-2">
              JACKPOT
            </h1>

            <div class="display text-center p-2 ">
              <p class="text-white">
                {{ messages[times_spinned] }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-slot p-2 rounded-xl">
        <div class="bg-black rounded-md py-2 px-1">
          <div
            class="reel-container flex overflow-hidden justify-around relative"
            @click="spin()"
          >
            <div
              class="reel items-center relative w-full px-2"
              :style="`transform: translateY(${reel.position}px)`"
              :key="reel"
              v-for="reel in reels"
            >
              <div
                class="item flex justify-center items-center text-xs bg-white"
                :key="item"
                v-for="item in reel_items"
              >
                <img :src="item.image" :title="item.name" :alt="item.name" />
              </div>
            </div>
            <div
              class="gradient-overlay absolute top-0 left-0 w-full h-full"
            ></div>
          </div>
        </div>

        <div class="pt-2">
          <div class="bg-gray-900 p-3 rounded-md">
            <div
              class="grid grid-cols-12 gap-3 items-center"
              v-show="livesOver"
            >
              <div
                class="col-span-6 display h-full flex justify-center items-center "
              >
                <p class="text-white uppercase">Spins: {{ livesOver }}</p>
              </div>

              <div class="col-span-6 ">
                <button
                  @click="spin()"
                  class="bg-green-500 p-3 text-white text-xl text-bold w-full rounded-md font-bold"
                  v-show="livesOver"
                >
                  SPIN NOW
                </button>
              </div>
            </div>
            <div v-show="!livesOver" class="animate-pulse">
              <a
                href="#"
                class="bg-red-500 p-3 text-white text-xl text-bold rounded-md block text-center font-bold"
                >CLAIM BONUS NOW</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slotmachine',
  data() {
    return {
      // totally not rigged slotmachine
      is_rolling: false,
      // copy the first two items and paste them at the end
      // this will create a perfect seam
      reel_items: [
        {
          name: 'cherry',
          image: require('@/assets/slotmachine/sprites/cherry.svg'),
        },
        {
          name: 'diamond',
          image: require('@/assets/slotmachine/sprites/diamond.svg'),
        },
        {
          name: 'horseshoe',
          image: require('@/assets/slotmachine/sprites/horseshoe.svg'),
        },
        {
          name: 'bell',
          image: require('@/assets/slotmachine/sprites/bell.svg'),
        },
        {
          name: 'melon',
          image: require('@/assets/slotmachine/sprites/melon.svg'),
        },
        {
          name: 'bar',
          image: require('@/assets/slotmachine/sprites/bar.svg'),
        },
        {
          name: 'cherry',
          image: require('@/assets/slotmachine/sprites/cherry.svg'),
        },
        {
          name: 'diamond',
          image: require('@/assets/slotmachine/sprites/diamond.svg'),
        },
      ],
      reels: [
        {
          position: -30,
          stop: [1, 3, 1],
        },
        {
          position: -30,
          stop: [2, 3, 1],
        },
        {
          position: -30,
          stop: [3, 3, 1],
        },
      ],
      times_spinned: 0,
      messages: [
        `Click on SPIN NOW`,
        `Try again 2 spins left `,
        `You've won 77 FREE SPINS!`,
        `You've won €200 WELCOME BONUS!`,
      ],
    };
  },
  computed: {
    livesOver() {
      return this.reels[0].stop.length - this.times_spinned;
    },
  },
  methods: {
    spin() {
      if (this.livesOver > 0 && !this.is_rolling) {
        this.is_rolling = true;
        const item_height = 60;

        const reel_height = (this.reel_items.length - 2) * item_height;

        this.reels.forEach((reel, index) => {
          const interval = setInterval(() => {
            if (reel.position < -reel_height) {
              reel.position = -item_height / 2;
            } else {
              reel.position -= 10;
            }
          }, 10);

          let item_nr = reel.stop[this.times_spinned];
          let item_stop_pos = item_nr * item_height;

          setTimeout(() => {
            clearInterval(interval);
            reel.position = -item_stop_pos + item_height / 2;

            // last one stopped rolling
            if (index === this.reels.length - 1) {
              this.is_rolling = false;
              this.times_spinned += 1;
            }
          }, 1535 + index * 200);
        });
      }
    },
  },
};
</script>

<style lang="scss">
.display {
  font-family: monospace;
  @apply bg-black border-gray-700 border rounded-md;
}

.reel-container {
  height: 120px;
  .reel {
    transform: translateY(-30px);
  }
  .item {
    height: 60px;
    img {
      height: 40px;
    }
  }
}
.bg-slot {
  background: rgb(255, 150, 6);
  background: -moz-linear-gradient(
    0deg,
    rgba(255, 150, 6, 1) 0%,
    rgba(255, 184, 6, 1) 23%,
    rgba(255, 229, 5, 1) 45%,
    rgba(255, 221, 5, 1) 82%,
    rgba(255, 207, 0, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(255, 150, 6, 1) 0%,
    rgba(255, 184, 6, 1) 23%,
    rgba(255, 229, 5, 1) 45%,
    rgba(255, 221, 5, 1) 82%,
    rgba(255, 207, 0, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(255, 150, 6, 1) 0%,
    rgba(255, 184, 6, 1) 23%,
    rgba(255, 229, 5, 1) 45%,
    rgba(255, 221, 5, 1) 82%,
    rgba(255, 207, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff9606",endColorstr="#ffcf00",GradientType=1);
}

.gradient-board {
  background: rgb(221, 13, 13);
  background: -moz-linear-gradient(
    0deg,
    rgba(221, 13, 13, 1) 0%,
    rgba(255, 96, 0, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(221, 13, 13, 1) 0%,
    rgba(255, 96, 0, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(221, 13, 13, 1) 0%,
    rgba(255, 96, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#dd0d0d",endColorstr="#ff6000",GradientType=1);
}
.gradient-overlay {
  background: -moz-linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.2959558823529411) 8%,
    rgba(0, 0, 0, 0.04665616246498594) 20%,
    rgba(0, 0, 0, 0.07746848739495793) 50%,
    rgba(0, 0, 0, 0.27354691876750703) 80%,
    rgba(0, 0, 0, 0.304359243697479) 90%,
    rgba(0, 0, 0, 1) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.2959558823529411) 8%,
    rgba(0, 0, 0, 0.04665616246498594) 20%,
    rgba(0, 0, 0, 0.07746848739495793) 50%,
    rgba(0, 0, 0, 0.27354691876750703) 80%,
    rgba(0, 0, 0, 0.304359243697479) 90%,
    rgba(0, 0, 0, 1) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.2959558823529411) 8%,
    rgba(0, 0, 0, 0.04665616246498594) 20%,
    rgba(0, 0, 0, 0.07746848739495793) 50%,
    rgba(0, 0, 0, 0.27354691876750703) 80%,
    rgba(0, 0, 0, 0.304359243697479) 90%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
