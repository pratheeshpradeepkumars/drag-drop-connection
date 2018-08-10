
import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
	LinkModel,
	DefaultPortModel,
	DiagramWidget,
	DefaultLinkModel,
	DefaultLabelModel
} from "storm-react-diagrams";
// Import the custom models
import {DefaultLinkFactory} from "./components/CustomComponent/factories/DefaultLinkFactory";
// Default custom component
import { DefaultNodeFactory } from "./components/CustomComponent/factories/DefaultNodeFactory";
// Diamond component 
import { DiamondNodeModel } from "./components/CustomComponent/Diamond/DiamondNodeModel";
import { DiamondNodeFactory } from "./components/CustomComponent/Diamond/DiamondNodeFactory";
import { SimplePortFactory } from "./components/CustomComponent/Diamond/SimplePortFactory";
import { DiamondPortModel } from "./components/CustomComponent/Diamond/DiamondPortModel";


export class Application {

	constructor() {
		this.diagramEngine = new DiagramEngine();
		this.diagramEngine.installDefaultFactories();

		this.diagramEngine.registerNodeFactory(new DefaultNodeFactory());
		this.diagramEngine.registerLinkFactory(new DefaultLinkFactory())

		// register some other factories as well
		this.diagramEngine.registerPortFactory(new SimplePortFactory("diamond", config => new DiamondPortModel()));
		this.diagramEngine.registerNodeFactory(new DiamondNodeFactory());
		
		this.newModel();
	}

	 newModel() {
		this.activeModel = new DiagramModel();
		this.diagramEngine.setDiagramModel(this.activeModel);

		//3-A) create a default node
		const node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
		let port = node1.addOutPort("Out");

		node1.setPosition(100, 100);

		//3-B) create another default node
		const node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
		let port2 = node2.addInPort("In");
		node2.setPosition(400, 400);

		const node3 = new DefaultNodeModel("Node E", "rgb(192,255,0)");
		node3.setPosition(450, 180);

		const label1 = new DefaultLabelModel();
		label1.setLabel("Label 1");
		//label1.setPosition(200, 200);

		// link the ports
		let link1 = port.link(port2);
		link1.addLabel("Custom label 1");
		link1.addLabel("Custom label 2");
		link1.point(200,135);

		

		this.activeModel.addAll(node1, node2, node3, label1, link1);
	}

	 getActiveDiagram() {
		return this.activeModel;
	}

	 getDiagramEngine() {
		return this.diagramEngine;
	}
}