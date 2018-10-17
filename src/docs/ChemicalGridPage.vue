<template>
<div class="container container-fluid">
  <!--Grid row-->
  <div class="row justify-content-center">
      <!--Grid column-->
    <div class="col-12">
    <div id="ag-grid-demo2">
    <button @click="getSelectedRows()">Get Selected Rows</button>
        <ag-grid-vue  v-bind:style="gridSize"
                    class="ag-theme-balham"
                    :columnDefs="columnDefs"
                    :rowData="rowData"
                    :enableSorting="true"
                    :enableFilter="true"
                    rowSelection="multiple"
                    :gridReady="onGridReady">
        </ag-grid-vue>
    </div>
    </div>
  </div>
</div>
</template>

<script>
   import {AgGridVue} from "ag-grid-vue";
  /* eslint-disable no-unused-vars */

export default {
        name: 'ChemicalGridPage',
        data() {
            return {
                gridSize: {
                  width: "1000px",
                  height: "600px"
                },
                columnDefs: "",
                rowData: "",
                gridApi: "",
                columnApi: "",
                autoGroupColumnDef: ""
            }
        },
        components: {
            AgGridVue
        },
        methods: {
            onGridReady(params) {
                this.gridApi = params.api;
                this.columnApi = params.columnApi;
            },
            getSelectedRows() {
                const selectedNodes = this.gridApi.getSelectedNodes();
                const selectedData = selectedNodes.map(node => node.data);
                const selectedDataStringPresentation = selectedData.map(node => node.id + ' ' + node.n).join(', ');
                alert(`Selected nodes: ${selectedDataStringPresentation}`);

            }
        },
        beforeMount() {
                this.columnDefs = [];

        fetch('./static/rowData.json')
        .then(result => result.json())
        .then(data => {
          console.log(data);
          this.columnDefs = []
          this.gridProperties = data.gridProperties;
          //console.log(this.gridProperties);
          for (let i = 0; i < this.gridProperties.headerNames.length; i++) {
            let columnDef = {};
            columnDef.headerName = this.gridProperties.headerNames[i];
            columnDef.headerTooltip = this.gridProperties.headerNames[i];
            columnDef.field = this.gridProperties.fields[i];
            columnDef.checkboxSelection = this.gridProperties.checkBox[i];
            columnDef.hide = this.gridProperties.hide[i];
            columnDef.width = this.gridProperties.cellWidth[i];
            columnDef.tooltipField = this.gridProperties.toolTipFields[i];
            this.columnDefs.push(columnDef);
          }
           this.gridSize.width = this.gridProperties.width;
           this.gridSize.height = this.gridProperties.height;
        //  console.log(this.columnDefs);
          this.rowData = data.rowData;
        });
        }
    }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}
</style>
