import React from "react";
import type { Node } from "reactflow";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { users } from "../../data/users";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface NodePropertiesProps {
  node: Node;
  onChange: (id: string, data: Record<string, unknown>) => void;
  onClose: () => void;
}

export function NodeProperties({
  node,
  onChange,
  onClose,
}: NodePropertiesProps) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Node Properties</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <span className="sr-only">Close</span>×
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <input
            id="title"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            value={node.data?.title || ""}
            onChange={(e) =>
              onChange(node.id, { ...node.data, title: e.target.value })
            }
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            value={node.data?.description || ""}
            onChange={(e) =>
              onChange(node.id, { ...node.data, description: e.target.value })
            }
          />
        </div>

        {node.type === "approval" && (
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <input
              id="assignee"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              value={node.data?.assignee || ""}
              onChange={(e) =>
                onChange(node.id, { ...node.data, assignee: e.target.value })
              }
            />
          </div>
        )}

        {node.data?.type === "decision" && (
          <div>
            <Label htmlFor="condition">Condition</Label>
            <input
              id="condition"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              value={node.data?.condition || ""}
              onChange={(e) =>
                onChange(node.id, { ...node.data, condition: e.target.value })
              }
            />
          </div>
        )}

        {(node.data?.type === "user" || node.data?.type === "notification") && (
          <div>
            <Label htmlFor="userId">Select User</Label>
            <div className="relative">
              <select
                id="userId"
                className={cn(
                  "w-full mt-1 px-3 py-2 border border-gray-300 rounded-md appearance-none pr-10",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                )}
                value={node.data?.userId || ""}
                onChange={(e) =>
                  onChange(node.id, { ...node.data, userId: e.target.value })
                }
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none mt-1">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NodeProperties;
