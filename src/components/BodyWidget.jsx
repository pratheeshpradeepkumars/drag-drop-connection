import  React from "react";
import * as _ from "lodash";
import TrayWidget  from "./TrayWidget";
import { Application } from "../Application";
import  TrayItemWidget  from "./TrayItemWidget";
import {DefaultNodeModel} from "./CustomComponent/models/DefaultNodeModel";
import { DiamondNodeModel } from "./CustomComponent/Diamond/DiamondNodeModel";
import { DiagramWidget } from "storm-react-diagrams";


/* export interface BodyWidgetProps {
	app: Application;
}

export interface BodyWidgetState {} */


export class BodyWidget extends React.Component/* <BodyWidgetProps, BodyWidgetState>  */{
	constructor(props/* : BodyWidgetProps */) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="body">
				<div className="header">
					<div className="title">Drag and drop connector</div>
				</div>
				<div className="content">
					<TrayWidget>
						<TrayItemWidget model={{ type: "in" }} name="In Node" color="rgb(192,255,0)" />
						<TrayItemWidget model={{ type: "out" }} name="Out Node" color="rgb(0,192,255)" />
						<TrayItemWidget model={{ type: "inout" }} name="In Out Node" color="rgb(233,30,99)" />
						<TrayItemWidget model={{ type: "diamond" }} name="Diamond" color="rgb(233,30,99)" />
					</TrayWidget>
					<div
						className="diagram-layer"
						onDrop={event => {
							var data = null;
							try {
								data = JSON.parse(event.dataTransfer.getData("text"));
							}catch(e){
								return;
							}
							//var data = JSON.parse(event.dataTransfer.getData("text"));
							var nodesCount = _.keys(
								this.props.app
									.getDiagramEngine()
									.getDiagramModel()
									.getNodes()
							).length;

							var node = null;
							if (data.type === "in") {
								node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(192,255,0)");
								node.addInPort("In");
							} else if(data.type === 'out') {
								node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(0,192,255)");
								node.addOutPort("Out");
							}
							else if(data.type === 'inout') {
								node = new DefaultNodeModel("Node " + (nodesCount + 1), "rgb(233,30,99)");
								node.addInPort("In");
								node.addOutPort("Out");
							}
							else if(data.type === 'diamond') {
								node = new DiamondNodeModel();
							}
							var points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
							node.x = points.x;
							node.y = points.y;
							this.props.app
								.getDiagramEngine()
								.getDiagramModel()
								.addNode(node);
							this.forceUpdate();
							node.addListener('click', function(ev) {
								node.preventDefault();
								alert('success!');
								return false;
							}, false);
							console.log(this.props.app.getDiagramEngine().getDiagramModel().serializeDiagram());
						}}
						onDragOver={event => {
							event.preventDefault();
						}}
					>
						<DiagramWidget 
							className="srd-demo-canvas" 
							diagramEngine={this.props.app.getDiagramEngine()} />
					</div>
				</div>
			</div>
		);
	}
}