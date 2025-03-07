import React from 'react';
import { Node } from 'reactflow';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';

interface NodePropertiesProps {
  node: Node;
  onChange: (id: string, data: any) => void;
  onClose: () => void;
}

export function NodeProperties({ node, onChange, onClose }: NodePropertiesProps) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Node Properties</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <span className="sr-only">Close</span>
          ×
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <input
            id="title"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            value={node.data?.title || ''}
            onChange={(e) => onChange(node.id, { ...node.data, title: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            value={node.data?.description || ''}
            onChange={(e) => onChange(node.id, { ...node.data, description: e.target.value })}
          />
        </div>

        {node.type === 'approval' && (
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <input
              id="assignee"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              value={node.data?.assignee || ''}
              onChange={(e) => onChange(node.id, { ...node.data, assignee: e.target.value })}
            />
          </div>
        )}

        {node.type === 'decision' && (
          <div>
            <Label htmlFor="condition">Condition</Label>
            <input
              id="condition"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              value={node.data?.condition || ''}
              onChange={(e) => onChange(node.id, { ...node.data, condition: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NodeProperties;