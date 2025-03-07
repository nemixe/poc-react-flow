import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { FileCheck, AlertCircle, Play, Flag } from 'lucide-react';

const nodeColors = {
  start: 'bg-green-100 border-green-500 text-green-700',
  approval: 'bg-blue-100 border-blue-500 text-blue-700',
  decision: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  end: 'bg-red-100 border-red-500 text-red-700',
};

const nodeIcons = {
  start: Play,
  approval: FileCheck,
  decision: AlertCircle,
  end: Flag,
};

function WorkflowNode({ data, type = 'approval' }: NodeProps) {
  const color = nodeColors[type as keyof typeof nodeColors] || nodeColors.approval;
  const Icon = nodeIcons[type as keyof typeof nodeIcons] || nodeIcons.approval;

  return (
    <div className={`px-4 py-2 rounded-lg border-2 shadow-sm ${color}`}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <div className="font-medium">{data.title || type}</div>
      </div>
      {data.description && (
        <div className="text-sm mt-1 opacity-75">{data.description}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(WorkflowNode);