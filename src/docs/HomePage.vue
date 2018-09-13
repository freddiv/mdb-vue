<template>
<div class="container container-fluid">
  <!--Grid row-->
  <div class="row justify-content-lg-center">
      <!--Grid column-->
      <div class="col-lg-8 offset-lg-2">
        <button @click="getSelectedRows()">Get Selected Rows</button>
         <ag-grid-vue style="width: 500px; height: 500px;"
                     class="ag-theme-balham"
                     :columnDefs="columnDefs"
                     :rowData="rowData"
                     :enableSorting="true"
                     :enableFilter="true"
                     rowSelection="multiple"

                     :gridReady="onGridReady">
        </ag-grid-vue>
      </div>
      <!--Grid column-->
      <!--Grid column-->
      <div class="col-lg-2"> </div>
      <!--Grid column-->
  </div>
  </div>
</template>


<script>
    import {AgGridVue} from "ag-grid-vue";

    export default {
        name: 'HomePage',
        data() {
            return {
                columnDefs: null,
                rowData: null
            } ;
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
                const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
                alert(`Selected nodes: ${selectedDataStringPresentation}`);
            }
        },
        beforeMount() {
            this.columnDefs = [
                {headerName: 'Make', field: 'make', rowGroupIndex: 0},
                {headerName: 'Model', field: 'model'},
                {headerName: 'Price', field: 'price'}
            ];

            this.autoGroupColumnDef = {
                headerName: 'Model',
                field: 'model',
                cellRenderer: 'agGroupCellRenderer',
                cellRendererParams: {
                    checkbox: true
                }
            };

            fetch('https://api.myjson.com/bins/15psn9')
                .then(result => result.json())
                .then(rowData => this.rowData = rowData);
        }
    }
</script>

<style>
</style>
