import * as React from "react";
import * as _ from "lodash";
import { DefaultNodeModel } from "../models/DefaultNodeModel";
import { DefaultPortLabel } from "storm-react-diagrams";
import { DiagramEngine } from "storm-react-diagrams";
import { BaseWidget, BaseWidgetProps } from "storm-react-diagrams";

/*export interface DefaultNodeProps extends BaseWidgetProps {
	node: DefaultNodeModel;
	diagramEngine: DiagramEngine;
}

export interface DefaultNodeState {}*/

export class DefaultNodeWidget extends BaseWidget/*<DefaultNodeProps, DefaultNodeState> */{
	constructor(props/*: DefaultNodeProps*/) {
		super("srd-default-node", props);
		this.state = {};
	}

	generatePort(port) {
		return <DefaultPortLabel model={port} key={port.id} />;
	}
	
	renameNode(id, name) {
		// Set new name
		//this.props.diagramEngine.diagramModel.nodes[id].name = name
		this.props.node.name = name;
		// Rerender diagram
		this.props.diagramEngine.repaintCanvas()
	}

	contextMenu (e) {
		e.preventDefault();
		var x = e.clientX,  
			y = e.clientY;
		alert(`Right click points : ( ${x} : ${y} )`);
	}

	render() {
		return (
			<div {...this.getProps()} style={{ background: this.props.node.color }}
			onDoubleClick={() =>this.renameNode(this.props.node.id, 'test new name')}
			onContextMenu={this.contextMenu}
			>
				<div className={this.bem("__title")}>
					
					<div className={this.bem("__name")}>{this.props.node.name}</div>
				</div>
				<div className={this.bem("__ports")}>
					<div className={this.bem("__in")}>
						{_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
					</div>
					<div className={this.bem("__out")}>
						{_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
					</div>
				</div>
			</div>
		);
	}
}
