import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Tooltip, UncontrolledTooltip } from "reactstrap";
import { Manager, Reference, Popper } from "react-popper";
import { AgGridReact } from "ag-grid-react";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham.css";

import "./styles.css";

console.log("amanager", Manager, "reference", Reference, "pooper", Popper);
const deleteRenderer = ({ node, data }) => (
  <button
    onClick={() => {
      // console.log("clicked", node, "data", data);
      node.gridApi.updateRowData({ remove: [data], foo: "foo" });
      // gridApi.setRowData([]);
      // var res = node.gridApi.updateRowData({
      //   add: [{ athlete: "nikolay rusev", age: 30, country: "bg" }],
      //   addIndex: 2
      // });
    }}
  >
    delete
  </button>
);

const countryRenderer = ({ data }) => (
  <div id={`at_${data.id}`}>
    {data.country}
    <Manager>
      <Reference>
        {({ ref }) => (
          <button type="button" ref={ref}>
            Reference element
          </button>
        )}
      </Reference>
      <Popper placement="right">
        {({ ref, style, placement, arrowProps }) => (
          <div ref={ref} style={style} data-placement={placement}>
            Popper element
            <div ref={arrowProps.ref} style={arrowProps.style} />
          </div>
        )}
      </Popper>
    </Manager>
  </div>
);

const Example = () => (
  <Manager>
    <Reference>
      {({ ref }) => (
        <button type="button" ref={ref}>
          Reference element
        </button>
      )}
    </Reference>
    <Popper placement="right">
      {({ ref, style, placement, arrowProps }) => (
        <div ref={ref} style={style} data-placement={placement}>
          Popper element
          <div ref={arrowProps.ref} style={arrowProps.style} />
        </div>
      )}
    </Popper>
  </Manager>
);

const columnDefs = [
  {
    headerName: "Athlete",
    field: "athlete",
    width: 150,
    suppressSizeToFit: true
  },
  {
    headerName: "Age",
    field: "age",
    width: 90,
    minWidth: 50,
    maxWidth: 100
  },
  {
    headerName: "Country",
    field: "country",
    width: 120,
    cellRenderer: "countryRenderer"
  },
  {
    headerName: "actions",
    width: 120,
    cellRenderer: "deleteRenderer1"
  }
];
const components = { deleteRenderer, countryRenderer };
class GridExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [
        { id: 1, athlete: "nikolay rusev", age: 30, country: "bg" },
        { id: 2, athlete: "gonzo", age: 21, country: "bg" },
        { id: 3, athlete: "sergio aguero", age: 30, country: "bg" }
      ]
    };
  }

  onGridReady(params) {
    console.log("params are", params);
  }
  rowDataChanged({ api }) {
    const rows = api.rowModel.rowsToDisplay.map(r => r.data);
    this.setState({
      rowData: rows
    });
  }
  onModelUpdated = (...all) => {
    // console.log("model updated", all);
  };

  onVirtualRowRemoved = ({ ...all }) => {
    // console.log("all", all);
  };
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <span id="click"> click me </span>
        <UncontrolledTooltip delay={0} target={"click"}>
          tool
        </UncontrolledTooltip>
        <Example />
        <div className="grid-wrapper">
          <div
            id="myGrid"
            style={{
              boxSizing: "border-box",
              height: "100%",
              width: "100%"
            }}
            className="ag-theme-balham"
          >
            <AgGridReact
              frameworkComponents={components}
              columnDefs={columnDefs}
              onGridReady={this.onGridReady.bind(this)}
              rowData={this.state.rowData}
              onRowDataUpdated={this.rowDataChanged.bind(this)}
              onVirtualRowRemoved={this.onVirtualRowRemoved}
              onModelUpdated={this.onModelUpdated}
            />
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: "500px",
          width: "600px"
        }}
      >
        <GridExample />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
