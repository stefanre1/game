<template>
  <div>
    <h1 class="py-2 text-center">Welcome to Memory game</h1>
    <div
      v-if="gameOver"
      class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 mb-4 shadow-md"
      role="alert"
    >
      <div class="flex">
        <div class="py-1">
          <svg
            class="fill-current h-6 w-6 text-teal-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
            />
          </svg>
        </div>
        <div>
          <p class="font-bold">Game over!</p>
        </div>
      </div>
    </div>
    <div class="gameContainer">
      <span
        v-for="(tile, index) in shuffledTiles"
        :key="`${tile}_${index}`"
        :data-key="`${tile}_${index}`"
        :class="['tile-data px-2', tile, getClass(tile + index, tile)]"
        @click="clickHandler(tile + index, tile)"
      >
        <img :src="`icons/${tile}.svg`" :alt="tile" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      tiles: ['apple', 'orange', 'tomato', 'strawberry', 'tree', 'lemon'],
      selectedTiles: {},
      openedTiles: {
        previousTile: '',
        currentTile: ''
      },
      gameOver: false
    }
  },
  computed: {
    shuffledTiles() {
      const tiles = [...this.tiles, ...this.tiles]
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[tiles[i], tiles[j]] = [tiles[j], tiles[i]]
      }
      return tiles
    }
  },
  methods: {
    getClass(name, tile) {
      let className = 'unreveal'
      if (this.selectedTiles[tile]) {
        className = 'reveal'
        return className
      }
      if (
        this.openedTiles.previousTile.id === name ||
        this.openedTiles.currentTile.id === name
      ) {
        className = 'reveal'
        return className
      }
      return className
    },
    clickHandler(name, tile) {
      if (this.selectedTiles[tile] || this.gameOver) {
        return
      }
      if (
        this.openedTiles.previousTile.name === tile &&
        this.openedTiles.previousTile.id !== name
      ) {
        this.$set(this.selectedTiles, tile, true)
        this.openedTiles.previousTile = {
          id: '',
          name: ''
        }
      } else if (this.openedTiles.previousTile.id) {
        if (this.openedTiles.previousTile.id === name) {
          return
        }
        this.openedTiles.currentTile = {
          id: name,
          name: tile
        }
        setTimeout(() => {
          this.openedTiles.previousTile = {
            id: '',
            name: ''
          }
          this.openedTiles.currentTile = {
            id: '',
            name: ''
          }
        }, 1000)
      } else {
        this.openedTiles.previousTile = {
          id: name,
          name: tile
        }
      }

      if (Object.keys(this.selectedTiles).length === this.tiles.length) {
        this.gameOver = true
      }
    }
  }
}
</script>

<style scoped>
.gameContainer {
  width: 320px;
}
.tile-data {
  width: 25%;
  height: 100px;
  float: left;
}
.tile-data.unreveal img {
  display: none;
}

.tile-data.unreveal {
  background: url(~assets/unrevel.png) no-repeat center;
  background-size: 65px 30px;
}
</style>
