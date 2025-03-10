import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import {
  FileCheck,
  AlertCircle,
  Play,
  Flag,
  CheckCircle,
  XCircle,
  Bell,
} from "lucide-react";
import { getUserById } from "../../data/users";

const nodeColors = {
  start: "bg-green-100 border-green-500 text-green-700",
  approval: "bg-blue-100 border-blue-500 text-blue-700",
  decision: "bg-yellow-100 border-yellow-500 text-yellow-700",
  end: "bg-red-100 border-red-500 text-red-700",
  notification: "bg-purple-100 border-purple-500 text-purple-700",
};

const nodeIcons = {
  start: Play,
  approval: FileCheck,
  decision: AlertCircle,
  end: Flag,
  notification: Bell,
};

function WorkflowNode({ data }: NodeProps) {
  const nodeType = data.type || "approval";
  const color =
    nodeColors[nodeType as keyof typeof nodeColors] || nodeColors.approval;
  const Icon =
    nodeIcons[nodeType as keyof typeof nodeIcons] || nodeIcons.approval;

  // Special handling for start nodes (one-directional - only output at bottom)
  if (nodeType === "start") {
    return (
      <div className={`px-4 py-2 rounded-lg border-2 shadow-sm ${color}`}>
        {/* Output handle at bottom only */}
        <Handle type="source" position={Position.Bottom} />

        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <div className="font-medium">{data.title || nodeType}</div>
        </div>

        {data.description && (
          <div className="text-sm mt-1 opacity-75">{data.description}</div>
        )}
      </div>
    );
  }

  // Special handling for end nodes (one-directional - only input at top)
  if (nodeType === "end") {
    return (
      <div className={`px-4 py-2 rounded-lg border-2 shadow-sm ${color}`}>
        {/* Input handle at top only */}
        <Handle type="target" position={Position.Top} />

        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <div className="font-medium">{data.title || nodeType}</div>
        </div>

        {data.description && (
          <div className="text-sm mt-1 opacity-75">{data.description}</div>
        )}
      </div>
    );
  }

  // Special handling for decision nodes (three handles: input left, output right/bottom)
  if (nodeType === "decision") {
    return (
      <div className={`px-4 py-2 rounded-lg border-2 shadow-sm ${color}`}>
        {/* Input handle on left side */}
        <Handle type="target" position={Position.Left} />

        {/* True output handle - right side */}
        <div
          className="absolute -right-7 top-1/3 transform -translate-y-1/2 flex items-center"
          style={{ pointerEvents: "none" }}
        >
          <span className="text-xs font-medium text-green-600 mr-1">True</span>
          <CheckCircle className="w-3 h-3 text-green-600" />
        </div>
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          className="!bg-green-500 !w-3 !h-3"
        />

        {/* False output handle - bottom */}
        <div
          className="absolute bottom-[-22px] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          style={{ pointerEvents: "none" }}
        >
          <XCircle className="w-3 h-3 text-red-600" />
          <span className="text-xs font-medium text-red-600">False</span>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="false"
          className="!bg-red-500 !w-3 !h-3"
        />

        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <div className="font-medium">{data.title || nodeType}</div>
        </div>

        {data.condition && (
          <div className="text-sm mt-1 p-1 bg-yellow-50 border border-yellow-200 rounded">
            <span className="font-medium">If:</span> {data.condition}
          </div>
        )}

        {data.description && (
          <div className="text-sm mt-1 opacity-75">{data.description}</div>
        )}
      </div>
    );
  }

  // Special handling for notification nodes
  if (nodeType === "notification") {
    const user = data.userId ? getUserById(data.userId) : undefined;

    return (
      <div className={`px-4 py-2 rounded-lg border-2 shadow-sm ${color}`}>
        {/* Two-directional handles (left and right) */}
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />

        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <div className="font-medium">{data.title || nodeType}</div>
        </div>

        {user ? (
          <div className="mt-2 flex items-center">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <div className="text-sm font-medium">{user.name}</div>
          </div>
        ) : (
          <div className="text-sm mt-1 opacity-75">No user selected</div>
        )}

        {data.description && (
          <div className="text-sm mt-1 opacity-75">{data.description}</div>
        )}
      </div>
    );
  }

  // Standard node rendering for other nodes (two handles: left and right)
  return (
    <div className={`px-4 py-2 rounded-lg border-2 shadow-sm ${color}`}>
      {/* Two-directional handles (left and right) */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <div className="font-medium">{data.title || nodeType}</div>
      </div>

      {data.description && (
        <div className="text-sm mt-1 opacity-75">{data.description}</div>
      )}
    </div>
  );
}

export default memo(WorkflowNode);
