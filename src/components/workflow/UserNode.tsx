import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { User as UserIcon } from "lucide-react";
import { getUserById } from "../../data/users";

interface UserNodeData {
  userId?: string;
  title?: string;
  description?: string;
  type: string;
}

function UserNode({ data }: NodeProps<UserNodeData>) {
  const user = data.userId ? getUserById(data.userId) : undefined;

  return (
    <div className="px-4 py-2 rounded-lg border-2 shadow-sm bg-purple-100 border-purple-500 text-purple-700">
      {/* Two-directional handles (left and right) */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className="flex items-center gap-2">
        <UserIcon className="w-4 h-4" />
        <div className="font-medium">{data.title || "User"}</div>
      </div>

      {user ? (
        <div className="mt-2 flex items-center">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <div>
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs opacity-75">{user.role}</div>
          </div>
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

export default memo(UserNode);
