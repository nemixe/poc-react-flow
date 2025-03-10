import { create } from "zustand";
import {
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type XYPosition,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNode: (id: string, data: Record<string, unknown>) => void;
  addNode: (type: string, position: XYPosition) => void;
};

let nodeId = 1;

export const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  updateNode: (id: string, data: Record<string, unknown>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
  },
  addNode: (type: string, position: XYPosition) => {
    const newNode: Node = {
      id: `node-${nodeId++}`,
      type: type === "user" ? "user" : "workflow",
      position,
      data: { type },
    };

    // Set default user for notification nodes
    if (type === "notification") {
      newNode.data.userId = "1"; // Default to John Doe
    }

    set({
      nodes: [...get().nodes, newNode],
    });
  },
}));
