<template>
  <div id="app">
    <bryntum-grid
        ref="grid"
        v-bind="gridConfig"
        :data="filteredItems"
        class="flex-1"
    />
    <button @click="saveState" style="margin-top: 20px; padding: 5px 8px;">Save state</button>
  </div>
</template>

<script>
import { BryntumGrid } from '@bryntum/grid-vue'

export default {
  components: {
    BryntumGrid
  },
  data () {
    return {
      gridConfig: {
        rowHeight: 60,
        minHeight: '20em',
        selectionMode: {
          checkbox: true,
          showCheckAll: true,
          row: false
        },
        columnLines: false,
        columns: [
          {
            flex: 1,
            htmlEncode: false,
            editor: false,
            filterable: false,
            text: 'Full name',
            field: 'fullName',
          },
          {
            text: 'Email',
            htmlEncode: false,
            renderer ({ record }) {
              return `<div class="text-blue-500">${record.email}</div>`
            },
            flex: 1
          },
          {
            text: 'Phone Number',
            htmlEncode: false,
            renderer ({ record }) {
              return `<div class="text-blue-500">${record.phone}</div>`
            },
            flex: 1
          }
        ]
      },
      gridInstance: null,
      gridStateId: 'grid.state-id',
      filteredItems: []
    }
  },
  created() {
    for(let i = 1; i < 10; i ++ ) {
      this.filteredItems.push({
        fullName: 'Tony Gonzales 1' + i ,
        email: 'ton@gmail.com',
        phone: '12321' + i
      })
    }
  },
  mounted() {
    this.gridInstance = this.$refs.grid.instance
    // console.log(this.gridInstance.isStateful)
    if (this.gridInstance) {
      const savedState = localStorage.getItem(this.gridStateId)
      if (savedState && this.gridInstance) {
        const parsedState = JSON.parse(savedState)
        this.gridInstance.applyState(parsedState)
      }
    }
  },
  methods: {
    saveState() {
      // gridInstance.saveState()
      // actually this state should give me 3 columns when I remove Phone number from the list but it provides 4 of them
      // that's why I just splice and copied to get only 2 columns and then apply them on mounted hook.
      const stateColumnsCopy = this.gridInstance.state.columns.splice(1, 2)
      const copiedInstance = { ...this.gridInstance.state }
      copiedInstance.columns = stateColumnsCopy
      localStorage.setItem(this.gridStateId, JSON.stringify(copiedInstance))
    },
    resetState() {
      // gridInstance.resetDefaultState()
      localStorage.removeItem(this.gridStateId)
    }
  }
}
</script>

<style>

</style>
