import * as React from "react";
import { DefaultLinkWidget } from "../widgets/DefaultLinkWidget";
import { DiagramEngine } from "storm-react-diagrams";
import { AbstractLinkFactory } from "storm-react-diagrams";
import { DefaultLinkModel } from "../models/DefaultLinkModel";

/**
 * @author Dylan Vorster
 */
export class DefaultLinkFactory extends AbstractLinkFactory {
	constructor() { 
		super("default");
	}

	generateReactWidget(diagramEngine, link) {
		return React.createElement(DefaultLinkWidget, {
			link: link,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig) {
		return new DefaultLinkModel();
	}

	generateLinkSegment(model, widget, selected, path) {
		return (
			<path
				className={selected ? widget.bem("--path-selected") : ""}
				strokeWidth={model.width}
				stroke={model.color}
				d={path}
			/>
		);
	}
}
