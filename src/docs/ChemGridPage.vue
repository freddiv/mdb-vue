<template>
<div class="container container-fluid">
  <!--Grid row-->
  <div class="row justify-content-center">
      <!--Grid column-->
    <div class="col-12">
    <div id="ag-grid-demo">
    <button @click="getSelectedRows()">Get Selected Rows</button>
        <ag-grid-vue style="width: 900px; height: 500px;"
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

    export default {
        name: 'ChemGridPage',
        data() {
            return {
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
            this.columnDefs = [
                {headerName: 'QC Level', field: 'q'},
                {headerName: 'DTXSID', field: 'id', checkboxSelection: true},
                {headerName: 'Preferred Name', field: 'n'},
                {headerName: 'CASRN', field: 'a'}

            ];

              this.autoGroupColumnDef = {
                headerName: 'ModeQC Level',
                field: 'q',
                cellRenderer: 'agGroupCellRenderer',
                cellRendererParams: {
                    checkbox: true
                }
            };

        fetch('./static/chemicals.json')
        .then(result => result.json())
        .then(rowData => this.rowData = rowData);
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
