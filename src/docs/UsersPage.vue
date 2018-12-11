<template>
<div class="container container-fluid">
  <!--Grid row-->
  <div class="row justify-content-center">
      <!--Grid column-->
     <div class="col-12">
    <div style="width: 760px;">
        <div style="padding: 4px;">
            <div style="float: right;">
                <input @keyup="onQuickFilterChanged" type="text" id="quickFilterInput"
                       placeholder="Type text to filter..."/>
            </div>
        </div>
        <div style="clear: both;"></div>
        <div>
            <div style="padding: 4px;" class="toolbar">
            <span>
                Grid API:
                <button @click="gridOptions.api.selectAll()">Select All</button>
                <button @click="gridOptions.api.deselectAll()">Clear Selection</button>
            </span>
                <span style="margin-left: 20px;">
                Column API:
                <button @click="gridOptions.columnApi.setColumnVisible('country', false)">Hide Country Column</button>
                <button @click="gridOptions.columnApi.setColumnVisible('country', true)">Show Country Column</button>
            </span>
            </div>
            <div class="example-section">
              Column State:
              <button @click="printState(gridApi)">Print State</button>
              <button @click="saveState(gridApi)">Save State</button>
              <button v-if="userGridConfig" @click="restoreState(gridApi)">Restore State</button>
              <button @click="resetState()">Reset State</button>
            </div>
            <div style="clear: both;"></div>
    <div id="ag-grid-demo">
    <button @click="getSelectedRows()">Get Selected Rows</button>
        <ag-grid-vue  v-bind:style="gridSize"
                    class="ag-theme-balham"
                    :defaultColDef="defaultColDef"
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
  </div>
</div>
</template>

<script>
import {AgGridVue} from "ag-grid-vue";
import RenderIsActive from './helpers/RenderIsActive';
  /* eslint-disable no-unused-vars */
  //  import {JL} from 'jsnlog';
    // "mylogger" logs to both the server and the console

const GRID_KEY = 'user-grid-config';
    const gridStore = {
      fetch: function () {
        var saveduserGridConfig = JSON.parse(localStorage.getItem(GRID_KEY)) || '';
         console.log(saveduserGridConfig);
        return saveduserGridConfig;
      },
      save: function (userGridConfig) {
        localStorage.setItem(GRID_KEY, userGridConfig);
      }
    };

export default {
        name: 'UserPage',
        data() {
            return {
                gridSize: {
                  width: "1000px",
                  height: "600px"
                },
                columnDefs: "",
                 defaultColDef: {
                  width: 100,
                  editable: true,
                  filter: 'agTextColumnFilter'
                },
                rowData: "",
                gridApi: "",
                columnApi: "",
                gridOptions: null,
                userGridConfig: gridStore.fetch(GRID_KEY) || '',
            }
        },
        components: {
            AgGridVue,
            RenderIsActive,
            ActiveCellRenderer: {
              template: '<span> {{displayValue()}} </span>',
              methods: {
                  displayValue() {
                      let data = this.params.data;
                      let displayVal = 'Deactivated';
                      if (data && data.is_active === true ) {
                          displayVal = 'Active';
                      }
                      return  displayVal ;
                      }
              }
          }
        }, watch: {
          userGridConfig: {
            handler: function (userGridConfig) {
              console.log('saved userGridConfig watch');
              gridStore.save(userGridConfig);
            },
            deep: true
          }
        },
        computed: {
           isLoggedIn: function(userGridConfig){
               console.log(this);
          if (userGridConfig){

                }
           }
        },
        methods: {
            onGridReady(params) {
                this.gridApi = params.api;
                this.columnApi = params.columnApi;
             // get a reference to the column
                var col = this.columnApi.getColumn("is_active");
                console.log( this.columnApi);
                // obtain the column definition from the column
              //  var colDef = col.getColDef();
                console.log(col);
            },
            getSelectedRows(params) {
              console.log(this.gridApi.getSelectedNodes())
                const selectedNodes = this.gridApi.getSelectedNodes();
                const selectedData = selectedNodes.map(node => node.data);
                 console.log(selectedData)
                const selectedDataStringPresentation = selectedData.map(node => node.id + ' ' + node.email).join(', ');
                 alert(`Selected nodes: ${selectedDataStringPresentation}`);

            },
        pad(num, totalStringSize) {
                let asString = num + "";
                while (asString.length < totalStringSize) asString = "0" + asString;
                return asString;
            },
            calculateRowCount() {
                if (this.gridOptions.api && this.rowData) {
                    let model = this.gridOptions.api.getModel();
                    let totalRows = this.rowData.length;
                    let processedRows = model.getRowCount();
                    this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
                }
            },
           printState(api) {
             console.log(api);
              api = this.gridApi;
              console.log(api);
               let gridConfig = {};
               gridConfig.colState = api.gridPanel.columnApi.getColumnState();
               gridConfig.groupState = api.gridPanel.columnApi.getColumnGroupState();
               gridConfig.sortState =api.getSortModel();
               gridConfig.filterState = api.getFilterModel();
               var gridConfigStr = JSON.stringify(gridConfig);
               console.log(gridConfigStr)
              // this.userGridConfig =  gridConfig;
              // let configJson = JSON.parse(this.userGridConfig);
                console.log("***********************");
                console.log("colState: ", gridConfig.colState);
                console.log("groupState: ", gridConfig.groupState);
                console.log("sortState: ", gridConfig.sortState);
                console.log("filterState: ", gridConfig.filterState);
                console.log("***********************");
            },
            restoreState(api){
              console.log(api);
              let savedColGrpState = this.userGridConfig.groupState;
              let savedColState = this.userGridConfig.colState;
              let savedSortState = this.userGridConfig.sortState;
              let savedFilterState = this.userGridConfig.filterState;

              console.log("***********************");
              console.log("savedColGrpState: ", savedColGrpState);
              console.log("savedColState: ", savedColState);
              console.log("savedSortState: ", savedSortState);
              console.log("savedFilterState: ", savedFilterState);
              console.log("***********************");

              //api.gridPanel.columnApi.setColumnGroupState(savedColGrpState);
              api.gridPanel.columnApi.setColumnState(savedColState);
              api.setFilterModel(savedFilterState);
              api.setSortModel(savedSortState);

            },

            saveState(api) {
              var thisApi = api;
              let gridConfig = {};
               gridConfig.colState = api.gridPanel.columnApi.getColumnState();
               gridConfig.groupState = api.gridPanel.columnApi.getColumnGroupState();
               gridConfig.sortState =api.getSortModel();
               gridConfig.filterState = api.getFilterModel();
               gridConfig = JSON.stringify(gridConfig);
               this.userGridConfig =  gridConfig;
               let configJson = JSON.parse(this.userGridConfig);
            },
            onModelUpdated() {
                console.log('onModelUpdated');
                this.calculateRowCount();
            },
            onReady() {
                console.log('onReady');
                this.calculateRowCount();
            },
            onCellClicked(event) {
                console.log(event.api)
                console.log('onCellClicked: ' + event.rowIndex + ' ' + event.colDef.field);
            },
            onCellValueChanged(event) {
                console.log('onCellValueChanged: ' + event.oldValue + ' to ' + event.newValue);
            },
            onCellDoubleClicked(event) {
                console.log('onCellDoubleClicked: ' + event.rowIndex + ' ' + event.colDef.field);
            },
            onCellContextMenu(event) {
                console.log('onCellContextMenu: ' + event.rowIndex + ' ' + event.colDef.field);
            },
            onCellFocused(event) {
                console.log('onCellFocused: (' + event.rowIndex + ',' + event.colIndex + ')');
            },
            // taking out, as when we 'select all', it prints to much to the console!!
            // eslint-disable-next-line
            onRowSelected(event) {
                // console.log('onRowSelected: ' + event.node.data.name);
            },
            onSelectionChanged() {
                var selectedRows = gridOptions.api.getSelectedRows();
                var selectedRowsString = '';
                selectedRows.forEach( function(selectedRow, index) {
                    if (index!==0) {
                        selectedRowsString += ', ';
                    }
                    selectedRowsString += selectedRow.athlete;
                });
                document.querySelector('#selectedRows').innerHTML = selectedRowsString;
                console.log('selectionChanged');
            },
            onBeforeFilterChanged() {
                console.log('beforeFilterChanged');
            },
            onAfterFilterChanged() {
                console.log('afterFilterChanged');
            },
            onFilterModified() {
                console.log('onFilterModified');
            },
            onBeforeSortChanged() {
                console.log('onBeforeSortChanged');
            },
            onAfterSortChanged() {
                console.log('onAfterSortChanged');
            },
            // eslint-disable-next-line
            onVirtualRowRemoved(event) {
                // because this event gets fired LOTS of times, we don't print it to the
                // console. if you want to see it, just uncomment out this line
                // console.log('onVirtualRowRemoved: ' + event.rowIndex);
            },
            onRowClicked(event) {
                console.log('onRowClicked: ' + event.node.data.name);
            },
            onQuickFilterChanged(event) {
                this.gridOptions.api.setQuickFilter(event.target.value);
            },
            // here we use one generic event to handle all the column type events.
            // the method just prints the event name
            onColumnEvent(event) {
                console.log('onColumnEvent: ' + event);
            },
        },
        beforeMount() {
                this.columnDefs = [];
                this.gridOptions = {};
        fetch('./static/users.json')
        .then(result => result.json())
        .then(data => {
          console.log(data);
          this.columnDefs = []
          this.gridProperties = data.gridProperties;
          console.log(this.gridProperties);

          this.columnDefs = JSON.parse('[{"headerName":"Id","field":"id","checkboxSelection":true,"hide":false,"suppressFilter": true,"suppressSorting": true,"width":30},{"headerName":"Last Name","headerTooltip":"Last Name","field":"last_name","hide":false,"filter":"agTextColumnFilter"},{"headerName":"First Name","headerTooltip":"First Name","field":"first_name","hide":false,"filter":"agTextColumnFilter","width":100},{"headerName":"Email Address","headerTooltip":"Email Address","field":"email","hide":false,"filter":"agTextColumnFilter","width":100},{"headerName":"Description","headerTooltip":"Description","field":"description","hide":true,"suppressFilter": true,"suppressSorting": true,"width":100},{"headerName":"Active","headerTooltip":"Active","field":"is_active","hide":false,"suppressFilter": true,"width":100,"cellRendererFramework": "RenderIsActive"},{"headerName":"Domains","headerTooltip":"Domains","field":"domains","hide":false,"suppressFilter": true,"suppressSorting": true,"width":100},{"headerName":"Expertises","headerTooltip":"Expertises","field":"expertises","hide":false,"suppressFilter": true,"suppressSorting": true,"width":100},{"headerName":"Sources","headerTooltip":"Sources","field":"sources","hide":false,"suppressFilter": true,"suppressSorting": true,"width":100},{"headerName":"Date Created","headerTooltip":"Date Created","field":"date_created","hide":false}]');

          this.defaultColDef = data.gridProperties.defaultColDef;
          this.rowData = data.rowData;
          console.log(this.columnDefs);
        });
        }
    }
function  isActiveCellRenderer(params) {
            console.log(params)
            let data = params.data;
            let displayVal = 'Deactivated';
            if (data && data.is_active === true ) {
                displayVal = 'Actively';
            }
            return  '<bold>' + displayVal + '</bold>';
          }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
