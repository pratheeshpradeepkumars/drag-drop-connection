import { DefaultNodeModel } from "../models/DefaultNodeModel";
import * as React from "react";
import { DefaultNodeWidget } from "../widgets/DefaultNodeWidget";
import { DiagramEngine } from "storm-react-diagrams";
import { AbstractNodeFactory } from "storm-react-diagrams";

export class DefaultNodeFactory extends AbstractNodeFactory/* <DefaultNodeModel> */ {
	constructor() {
		super("default");
	}

	generateReactWidget(diagramEngine/* : DiagramEngine */, node/* : DefaultNodeModel */)/* : JSX.Element */ {
		return React.createElement(DefaultNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig/* ?: any */)/* : DefaultNodeModel */ {
		return new DefaultNodeModel();
	}
}
