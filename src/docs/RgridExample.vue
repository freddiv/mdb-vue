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
                <button :disabled="!showGrid" @click="showGrid=false">Destroy Grid</button>
                <button :disabled="showGrid" @click="showGrid=true">Create Grid</button>
            </div>
            <div>
                <b>Employees Skills and Contact Details</b>
                {{rowCount}}
            </div>
        </div>
        <div style="clear: both;"></div>
        <div v-if="showGrid">
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
              <button @click="printState(gridOptions.api)">Print State</button>
              <button @click="saveState(gridOptions.api)">Save State</button>
              <button v-if="richGridConfig" @click="restoreState(gridOptions.api)">Restore State</button>
              <button @click="resetState()">Reset State</button>
            </div>
            <div style="padding: 4px;" class="toolbar">
                <label>
                    <input type="checkbox" v-model="sideBar"/>
                    Show Side Bar
                </label>
                <button @click="createRowData()">Refresh Data</button>
            </div>
            <div style="clear: both;"></div>
            <ag-grid-vue style="width: 100%; height: 350px;" class="ag-theme-balham"
                         :gridOptions="gridOptions"
                         :columnDefs="columnDefs"
                         :rowData="rowData"
                         :sideBar="sideBar"

                         :enableColResize="true"
                         :enableSorting="true"
                         :enableFilter="true"
                         :groupHeaders="true"
                         :suppressRowClickSelection="true"
                         rowSelection="multiple"

                         :modelUpdated="onModelUpdated"
                         :cellClicked="onCellClicked"
                         :cellDoubleClicked="onCellDoubleClicked"
                         :cellContextMenu="onCellContextMenu"
                         :cellValueChanged="onCellValueChanged"
                         :cellFocused="onCellFocused"
                         :rowSelected="onRowSelected"
                         :selectionChanged="onSelectionChanged"
                         :beforeFilterChanged="onBeforeFilterChanged"
                         :afterFilterChanged="onAfterFilterChanged"
                         :filterModified="onFilterModified"
                         :beforeSortChanged="onBeforeSortChanged"
                         :afterSortChanged="onAfterSortChanged"
                         :virtualRowRemoved="onVirtualRowRemoved"
                         :rowClicked="onRowClicked"
                         :gridReady="onReady"

                         :columnEverythingChanged="onColumnEvent"
                         :columnRowGroupChanged="onColumnEvent"
                         :columnValueChanged="onColumnEvent"
                         :columnMoved="onColumnEvent"
                         :columnVisible="onColumnEvent"
                         :columnGroupOpened="onColumnEvent"
                         :columnResized="onColumnEvent"
                         :columnPinnedCountChanged="onColumnEvent">
            </ag-grid-vue>
        </div>
    </div>
  </div>
  <!--Grid column-->
  </div>
  </div>
</template>

<script>
    /* eslint-disable */
    import {AgGridVue} from "ag-grid-vue";
    import {ProficiencyFilter} from './helpers/proficiencyFilter.js';
    import {SkillFilter} from './helpers/skillFilter.js';
    import DateComponent from './helpers/DateComponent.vue';
    import HeaderGroupComponent from './helpers/HeaderGroupComponent.vue';
    import RefData from './helpers/refData.js';
    const GRID_KEY = 'rich-grid-config';
    const gridStore = {
      fetch: function () {
        var savedRichGridConfig = JSON.parse(localStorage.getItem(GRID_KEY)) || '';
         console.log(savedRichGridConfig);
        return savedRichGridConfig;
      },
      save: function (richGridConfig) {
        localStorage.setItem(GRID_KEY, richGridConfig);
      }
    };
    export default {
        data() {
             return {
                gridOptions: null,
                columnDefs: null,
                rowData: null,
                showGrid: false,
                sideBar: false,
                rowCount: null,
                richGridConfig: gridStore.fetch(GRID_KEY) || '',
            }

        },
        components: {
            AgGridVue,
            
        },
        watch: {
          richGridConfig: {
            handler: function (richGridConfig) {
              console.log('saved richGridConfig watch');
              gridStore.save(richGridConfig);
            },
            deep: true
          }
        },
        computed: {
           isLoggedIn: function(richGridConfig){
               console.log(this);
          if (richGridConfig){

                }
           }
        },
        methods: {
            createRowData() {
                const rowData = [];
                for (let i = 0; i < 200; i++) {
                    const countryData = RefData.COUNTRIES[i % RefData.COUNTRIES.length];
                    rowData.push({
                        name: RefData.FIRST_NAMES[i % RefData.FIRST_NAMES.length] + ' ' + RefData.LAST_NAMES[i % RefData.LAST_NAMES.length],
                        skills: {
                            android: Math.random() < 0.4,
                            html5: Math.random() < 0.4,
                            mac: Math.random() < 0.4,
                            windows: Math.random() < 0.4,
                            css: Math.random() < 0.4
                        },
                        dob: RefData.DOBs[i % RefData.DOBs.length],
                        address: RefData.ADDRESSES[i % RefData.ADDRESSES.length],
                        years: Math.round(Math.random() * 100),
                        proficiency: Math.round(Math.random() * 100),
                        country: countryData.country,
                        continent: countryData.continent,
                        language: countryData.language,
                        mobile: createRandomPhoneNumber(),
                        landline: createRandomPhoneNumber()
                    });
                }
                this.rowData = rowData;
            },
            createColumnDefs() {
                this.columnDefs = [
                    {
                        headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                        suppressMenu: true, pinned: true
                    },
                    {
                        headerName: 'Employee',
                        headerGroupComponentFramework: HeaderGroupComponent,
                        children: [
                            {
                                headerName: "Name", field: "name",
                                width: 150, pinned: true,
                                filter: "agTextColumnFilter"
                            },
                            {
                                headerName: "Country", field: "country", width: 150,
                                cellRenderer: countryCellRenderer, pinned: true,
                                filter: "agTextColumnFilter",
                                filterParams: {cellRenderer: countryCellRenderer, cellHeight: 20}
                            },
                            {
                                headerName: "DOB",
                                field: "dob",
                                width: 120,
                                pinned: true,
                                cellRenderer: (params) => {
                                    return this.pad(params.value.getDate(), 2) + '/' +
                                        this.pad(params.value.getMonth() + 1, 2) + '/' +
                                        params.value.getFullYear();
                                },
                                filter: 'agDateColumnFilter',
                                columnGroupShow: 'open'
                            }
                        ]
                    },
                    {
                        headerName: 'IT Skills',
                        children: [
                            {
                                headerName: "Skills",
                                width: 125,
                                suppressSorting: true,
                                cellRenderer: skillsCellRenderer,
                                filter: SkillFilter
                            },
                            {
                                headerName: "Proficiency",
                                field: "proficiency",
                                width: 120,
                                cellRenderer: percentCellRenderer,
                                filter: ProficiencyFilter
                            },
                        ]
                    },
                    {
                        headerName: 'Contact',
                        children: [
                            {headerName: "Mobile", field: "mobile", width: 150, filter: "agTextColumnFilter"},
                            {headerName: "Land-line", field: "landline", width: 150, filter: "agTextColumnFilter"},
                            {headerName: "Address", field: "address", width: 500, filter: "agTextColumnFilter"}
                        ]
                    }
                ];

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
               let gridConfig = {};
               gridConfig.colState = api.gridPanel.columnApi.getColumnState();
               gridConfig.groupState = api.gridPanel.columnApi.getColumnGroupState();
               gridConfig.sortState =api.getSortModel();
               gridConfig.filterState = api.getFilterModel();
               var gridConfigStr = JSON.stringify(gridConfig);
               console.log(gridConfigStr)
              // this.richGridConfig =  gridConfig;
              // let configJson = JSON.parse(this.richGridConfig);
                console.log("***********************");
                console.log("colState: ", gridConfig.colState);
                console.log("groupState: ", gridConfig.groupState);
                console.log("sortState: ", gridConfig.sortState);
                console.log("filterState: ", gridConfig.filterState);
                console.log("***********************");
            },
            restoreState(api){
              let savedColGrpState = this.richGridConfig.groupState;
              let savedColState = this.richGridConfig.colState;
              let savedSortState = this.richGridConfig.sortState;
              let savedFilterState = this.richGridConfig.filterState;

              console.log("***********************");
              console.log("savedColGrpState: ", savedColGrpState);
              console.log("savedColState: ", savedColState);
              console.log("savedSortState: ", savedSortState);
              console.log("savedFilterState: ", savedFilterState);
              console.log("***********************");

              api.gridPanel.columnApi.setColumnGroupState(savedColGrpState);
              api.gridPanel.columnApi.setColumnState(savedColState);
              api.setFilterModel();
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
               this.richGridConfig =  gridConfig;
               let configJson = JSON.parse(this.richGridConfig);
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
            }
        },
        beforeMount() {
            this.gridOptions = {};
            this.gridOptions.dateComponentFramework = DateComponent;
            this.createRowData();
            this.createColumnDefs();
           console.log(this.grid);
            this.showGrid = true;
        }
    }
    function skillsCellRenderer(params) {
      console.log(RefData)
        let data = params.data;
        let skills = [];
        RefData.IT_SKILLS.forEach(function (skill) {
            if (data && data.skills && data.skills[skill]) {
                skills.push('<img src="https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
            }
        });
        return skills.join(' ');
    }
    function countryCellRenderer(params) {
        let flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/images/flags/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
        return flag + " " + params.value;
    }
    function createRandomPhoneNumber() {
        let result = '+';
        for (let i = 0; i < 12; i++) {
            result += Math.round(Math.random() * 10);
            if (i === 2 || i === 5 || i === 8) {
                result += ' ';
            }
        }
        return result;
    }
    function percentCellRenderer(params) {
        let value = params.value;
        let eDivPercentBar = document.createElement('div');
        eDivPercentBar.className = 'div-percent-bar';
        eDivPercentBar.style.width = value + '%';
        if (value < 20) {
            eDivPercentBar.style.backgroundColor = 'red';
        } else if (value < 60) {
            eDivPercentBar.style.backgroundColor = '#ff9900';
        } else {
            eDivPercentBar.style.backgroundColor = '#00A000';
        }
        let eValue = document.createElement('div');
        eValue.className = 'div-percent-value';
        eValue.innerHTML = value + '%';
        let eOuterDiv = document.createElement('div');
        eOuterDiv.className = 'div-outer-div';
        eOuterDiv.appendChild(eValue);
        eOuterDiv.appendChild(eDivPercentBar);
        return eOuterDiv;
    }
</script>

<style>
    .ag-cell {
        padding-top: 2px !important;
        padding-bottom: 2px !important;
    }
    label {
        font-weight: normal !important;
    }
    .div-percent-bar {
        display: inline-block;
        height: 100%;
        position: relative;
        z-index: 0;
    }
    .div-percent-value {
        position: absolute;
        padding-left: 4px;
        font-weight: bold;
        font-size: 13px;
        z-index: 100;
    }
    .div-outer-div {
        display: inline-block;
        height: 100%;
        width: 100%;
    }
    .ag-menu {
        z-index: 200;
    }
    .toolbar button {
        margin-left: 5px;
        margin-right: 5px;
        padding: 2px;
    }
</style>
