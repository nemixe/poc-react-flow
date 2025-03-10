import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { useStore } from "./store/workflowStore";
import WorkflowNode from "./components/workflow/WorkflowNode";
import UserNode from "./components/workflow/UserNode";
import Toolbar from "./components/workflow/Toolbar";
import NodeProperties from "./components/workflow/NodeProperties";

const nodeTypes = {
  workflow: WorkflowNode,
  user: UserNode,
};

function Flow() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNode,
    addNode,
  } = useStore();
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null);
  const { project, getNodes, setViewport, zoomIn, zoomOut, fitView } =
    useReactFlow();

  const onSave = useCallback(() => {
    const flow = {
      nodes: getNodes(),
      edges,
    };
    alert(JSON.stringify(flow, null, 2));
  }, [getNodes, edges]);

  const onAddNode = useCallback(
    (type: string) => {
      const position = project({
        x: window.innerWidth / 2,
        y: window.innerHeight / 3,
      });
      addNode(type, position);
    },
    [project, addNode]
  );

  const selectedNodeData = nodes.find((node) => node.id === selectedNode);

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        onAddNode={onAddNode}
        onSave={onSave}
        onUndo={() => {}}
        onRedo={() => {}}
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onFitView={() => fitView()}
      />
      <div className="flex-1 flex">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => setSelectedNode(node.id)}
          onPaneClick={() => setSelectedNode(null)}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
        {selectedNodeData && (
          <NodeProperties
            node={selectedNodeData}
            onChange={updateNode}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default App;
